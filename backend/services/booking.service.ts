import { prisma } from "../utils/prisma";
import { BookingStatus, type Booking } from "@prisma/client";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;

export interface CreateBookingInput {
    eventTypeId: string;
    attendeeName: string;
    attendeeEmail: string;
    startTime: string;
    endTime: string;
}

export interface BookingWithEventType extends Booking {
    eventType: {
        title: string;
        duration: number;
        slug: string;
    };
}

export async function createBooking(
    input: CreateBookingInput
): Promise<Booking> {
    const startTime = new Date(input.startTime);
    const endTime = new Date(input.endTime);

    return prisma.$transaction(async (tx: any) => {
        const conflicts = await tx.booking.findMany({
            where: {
                eventType: { userId: DEFAULT_USER_ID },
                status: BookingStatus.CONFIRMED,
                startTime: { lt: endTime },
                endTime: { gt: startTime },
            },
        });

        if (conflicts.length > 0) {
            throw new Error("This time slot is no longer available.");
        }

        return tx.booking.create({
            data: {
                eventTypeId: input.eventTypeId,
                guestName: input.attendeeName,
                guestEmail: input.attendeeEmail,
                startTime,
                endTime,
                status: BookingStatus.CONFIRMED,
            },
        });
    });
}

export async function listBookings(
    filter: "upcoming" | "past" | "all"
): Promise<BookingWithEventType[]> {
    const now = new Date();

    const whereClause: any = {
        eventType: { userId: DEFAULT_USER_ID },
    };

    if (filter === "upcoming") {
        whereClause.startTime = { gte: now };
        whereClause.status = BookingStatus.CONFIRMED;
    }

    if (filter === "past") {
        whereClause.startTime = { lt: now };
    }

    return prisma.booking.findMany({
        where: whereClause,
        include: {
            eventType: {
                select: {
                    title: true,
                    duration: true,
                    slug: true,
                },
            },
        },
        orderBy: {
            startTime: filter === "upcoming" ? "asc" : "desc",
        },
    }) as Promise<BookingWithEventType[]>;
}

export async function getBookingById(
    id: string
): Promise<BookingWithEventType | null> {
    return prisma.booking.findUnique({
        where: { id },
        include: {
            eventType: {
                select: {
                    title: true,
                    duration: true,
                    slug: true,
                },
            },
        },
    }) as Promise<BookingWithEventType | null>;
}

export async function cancelBooking(id: string): Promise<Booking> {
    return prisma.booking.update({
        where: { id },
        data: {
            status: BookingStatus.CANCELLED,
        },
    });
}

export async function deleteBooking(id: string): Promise<void> {
    await prisma.booking.delete({
        where: { id },
    });
}