import { prisma } from "../utils/prisma";
import type { EventType } from "@prisma/client";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;

export interface CreateEventTypeInput {
    title: string;
    description?: string;
    duration: number;
    slug: string;
}

export interface UpdateEventTypeInput extends Partial<CreateEventTypeInput> {
    isActive?: boolean;
}

export async function listEventTypes(): Promise<EventType[]> {
    return prisma.eventType.findMany({
        where: { userId: DEFAULT_USER_ID },
        orderBy: { createdAt: "asc" },
    });
}

export async function getEventTypeById(
    id: string
): Promise<EventType | null> {
    return prisma.eventType.findUnique({ where: { id } });
}

export async function getEventTypeBySlug(
    slug: string
): Promise<EventType | null> {
    return prisma.eventType.findFirst({
        where: {
            slug,
            userId: DEFAULT_USER_ID,
        },
    });
}

export async function createEventType(
    data: CreateEventTypeInput
): Promise<EventType> {
    const existing = await prisma.eventType.findFirst({
        where: {
            slug: data.slug,
            userId: DEFAULT_USER_ID,
        },
    });

    if (existing) {
        throw new Error(`Slug "${data.slug}" already exists.`);
    }

    return prisma.eventType.create({
        data: {
            userId: DEFAULT_USER_ID,
            title: data.title,
            description: data.description ?? "",
            duration: data.duration,
            slug: data.slug,
        },
    });
}

export async function updateEventType(
    id: string,
    data: UpdateEventTypeInput
): Promise<EventType> {
    if (data.slug) {
        const existing = await prisma.eventType.findFirst({
            where: {
                slug: data.slug,
                userId: DEFAULT_USER_ID,
                NOT: { id },
            },
        });

        if (existing) {
            throw new Error(`Slug "${data.slug}" already exists.`);
        }
    }

    return prisma.eventType.update({
        where: { id },
        data: {
            ...(data.title !== undefined && { title: data.title }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.duration !== undefined && { duration: data.duration }),
            ...(data.slug !== undefined && { slug: data.slug }),
            ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
    });
}

export async function deleteEventType(id: string): Promise<void> {
    await prisma.$transaction(async (tx: any) => {
        await tx.booking.deleteMany({
            where: { eventTypeId: id },
        });

        await tx.eventType.delete({
            where: { id },
        });
    });
}