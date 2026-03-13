import { prisma } from "../utils/prisma";
import { BookingStatus } from "@prisma/client";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;

export interface SlotQuery {
    slug: string;
    date: string;
}

const MIN_NOTICE_MINUTES = 120; // 2 hours
const MAX_BOOKING_DAYS = 30;
const BUFFER_MINUTES = 5;

export async function getAvailableSlots(query: SlotQuery) {
    const user = await prisma.user.findUnique({
        where: {
            id: DEFAULT_USER_ID,
        },
        select: {
            timezone: true,
        },
    });

    if (!user || !user.timezone) {
        throw new Error("User or user timezone not found");
    }

    const eventType = await prisma.eventType.findFirst({
        where: {
            slug: query.slug,
            userId: DEFAULT_USER_ID,
            isActive: true,
        },
    });

    if (!eventType) throw new Error("Event type not found");

    // Parse requested date as a UTC date, then convert to local date in user's timezone
    const requestedDateUTC = new Date(query.date); // e.g., 2023-10-27T00:00:00.000Z

    // Create a Date object representing the start of the requested day in the user's timezone
    // This is crucial for accurate dayOfWeek and local time calculations.
    const requestedDateLocal = new Date(
        requestedDateUTC.toLocaleString("en-US", { timeZone: user.timezone })
    );

    // ─────────────────────────────────────────────
    // Booking window validation
    // ─────────────────────────────────────────────

    const now = new Date(); // Current time in UTC
    const maxDate = new Date();
    maxDate.setDate(now.getDate() + MAX_BOOKING_DAYS);

    // Compare requestedDateUTC (start of day in UTC) with now and maxDate (both UTC)
    if (requestedDateUTC < now || requestedDateUTC > maxDate) {
        return [];
    }

    // dayOfWeek needs to be based on the user's local time for availability lookup
    const dayOfWeek = requestedDateLocal.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const availability = await prisma.availability.findUnique({
        where: {
            userId_dayOfWeek: {
                userId: DEFAULT_USER_ID,
                dayOfWeek,
            },
        },
    });

    if (!availability || !availability.isActive) return [];

    // ─────────────────────────────────────────────
    // Parse availability and construct local start/end times
    // ─────────────────────────────────────────────

    const [startHour, startMin] = availability.startTime.split(":").map(Number);
    const [endHour, endMin] = availability.endTime.split(":").map(Number);

    // Get the UTC offset for the user's timezone on the requested date (in minutes)
    // e.g. IST is UTC+5:30 → offset = -330 (getTimezoneOffset returns negative for east of UTC)
    // We use a trick: format the date in the tz, parse it, compare against UTC
    const tzOffsetMinutes = getTzOffsetMinutes(user.timezone, requestedDateUTC);

    // Build start/end as UTC: take the start of requested day in UTC,
    // then add the local hour as offset, subtract the tz offset to get correct UTC
    const dayStartUTC = new Date(requestedDateUTC);
    dayStartUTC.setUTCHours(0, 0, 0, 0);

    // local 09:00 in timezone X is UTC 09:00 minus (tzOffset in minutes)
    const startUTC = new Date(dayStartUTC.getTime() + (startHour * 60 + startMin - tzOffsetMinutes) * 60000);
    const endUTC = new Date(dayStartUTC.getTime() + (endHour * 60 + endMin - tzOffsetMinutes) * 60000);

    // ─────────────────────────────────────────────
    // Minimum notice
    // ─────────────────────────────────────────────

    // minStart should also be calculated relative to the current time in UTC
    // as all slot times will be compared in UTC.
    const minStart = new Date(now.getTime() + MIN_NOTICE_MINUTES * 60000);

    // ─────────────────────────────────────────────
    // Existing bookings
    // ─────────────────────────────────────────────

    const bookings = await prisma.booking.findMany({
        where: {
            eventTypeId: eventType.id,
            status: BookingStatus.CONFIRMED,
            startTime: {
                gte: startUTC, // Compare with UTC start of availability
                lt: endUTC, // Compare with UTC end of availability
            },
        },
    });

    const duration = eventType.duration;

    const slots: string[] = [];
    let cursor = new Date(startUTC); // Start cursor from the UTC start of availability

    while (cursor.getTime() + duration * 60000 <= endUTC.getTime()) {
        const slotStart = new Date(cursor);
        const slotEnd = new Date(
            cursor.getTime() + duration * 60000 + BUFFER_MINUTES * 60000
        );

        // minimum notice check (all times are UTC for comparison)
        if (slotStart < minStart) {
            cursor = new Date(cursor.getTime() + duration * 60000);
            continue;
        }

        const conflict = bookings.some(
            (booking: any) =>
                slotStart < booking.endTime && slotEnd > booking.startTime
        );

        if (!conflict) {
            slots.push(slotStart.toISOString());
        }

        cursor = new Date(cursor.getTime() + duration * 60000);
    }

    return slots;
}

/**
 * Returns the UTC offset in minutes for an IANA timezone on a given date.
 * Positive means the timezone is ahead of UTC (e.g., IST = +330).
 */
function getTzOffsetMinutes(timezone: string, date: Date): number {
    try {
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        }).formatToParts(date);

        const getPart = (type: string) => parseInt(parts.find((p) => p.type === type)?.value || "0", 10);

        const tzDateUTC = Date.UTC(
            getPart("year"),
            getPart("month") - 1,
            getPart("day"),
            getPart("hour") === 24 ? 0 : getPart("hour"),
            getPart("minute"),
            getPart("second")
        );

        return (tzDateUTC - date.getTime()) / 60000;
    } catch (e) {
        console.error("Error calculating timezone offset:", e);
        return 0;
    }
}