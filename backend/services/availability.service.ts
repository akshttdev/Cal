import { prisma } from "../utils/prisma";
import type { Availability } from "@prisma/client";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;

export interface AvailabilityInput {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
}

export async function getAvailability(): Promise<Availability[]> {
    return prisma.availability.findMany({
        where: { userId: DEFAULT_USER_ID },
        orderBy: { dayOfWeek: "asc" },
    });
}

export async function upsertAvailability(
    input: AvailabilityInput
): Promise<Availability> {
    return prisma.availability.upsert({
        where: {
            userId_dayOfWeek: {
                userId: DEFAULT_USER_ID,
                dayOfWeek: input.dayOfWeek,
            },
        },
        update: {
            startTime: input.startTime,
            endTime: input.endTime,
            isActive: input.isActive,
        },
        create: {
            userId: DEFAULT_USER_ID,
            dayOfWeek: input.dayOfWeek,
            startTime: input.startTime,
            endTime: input.endTime,
            isActive: input.isActive,
        },
    });
}

export async function bulkUpdateAvailability(
    inputs: AvailabilityInput[]
): Promise<Availability[]> {
    return prisma.$transaction(
        inputs.map((input) =>
            prisma.availability.upsert({
                where: {
                    userId_dayOfWeek: {
                        userId: DEFAULT_USER_ID,
                        dayOfWeek: input.dayOfWeek,
                    },
                },
                update: {
                    startTime: input.startTime,
                    endTime: input.endTime,
                    isActive: input.isActive,
                },
                create: {
                    userId: DEFAULT_USER_ID,
                    dayOfWeek: input.dayOfWeek,
                    startTime: input.startTime,
                    endTime: input.endTime,
                    isActive: input.isActive,
                },
            })
        )
    );
}