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
    const eventType = await prisma.eventType.findFirst({
        where: {
            slug: query.slug,
            userId: DEFAULT_USER_ID,
            isActive: true,
        },
    });

    if (!eventType) throw new Error("Event type not found");

    const requestedDate = new Date(query.date);

    // ─────────────────────────────────────────────
    // Booking window validation
    // ─────────────────────────────────────────────

    const now = new Date();
    const maxDate = new Date();
    maxDate.setDate(now.getDate() + MAX_BOOKING_DAYS);

    if (requestedDate < now || requestedDate > maxDate) {
        return [];
    }

    const dayOfWeek = requestedDate.getUTCDay();

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
    // Parse availability
    // ─────────────────────────────────────────────

    const [startHour, startMin] = availability.startTime.split(":").map(Number);
    const [endHour, endMin] = availability.endTime.split(":").map(Number);

    const start = new Date(requestedDate);
    start.setUTCHours(startHour, startMin, 0, 0);

    const end = new Date(requestedDate);
    end.setUTCHours(endHour, endMin, 0, 0);

    // ─────────────────────────────────────────────
    // Minimum notice
    // ─────────────────────────────────────────────

    const minStart = new Date(now.getTime() + MIN_NOTICE_MINUTES * 60000);

    // ─────────────────────────────────────────────
    // Existing bookings
    // ─────────────────────────────────────────────

    const bookings = await prisma.booking.findMany({
        where: {
            eventTypeId: eventType.id,
            status: BookingStatus.CONFIRMED,
            startTime: {
                gte: start,
                lt: end,
            },
        },
    });

    const duration = eventType.duration;

    const slots: string[] = [];
    let cursor = new Date(start);

    while (cursor.getTime() + duration * 60000 <= end.getTime()) {
        const slotStart = new Date(cursor);
        const slotEnd = new Date(
            cursor.getTime() + duration * 60000 + BUFFER_MINUTES * 60000
        );

        // minimum notice check
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