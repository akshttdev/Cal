/**
 * Prisma Seed Script — Cal Clone
 * Run with: npx ts-node --transpile-only prisma/seed.ts
 */

import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter } as any);

async function main() {
    console.log("🌱 Starting seed...");

    // ─────────────────────────────────────────────
    // 1. Default User
    // ─────────────────────────────────────────────

    const user = await prisma.user.upsert({
        where: { email: "demo@cal.com" },
        update: {},
        create: {
            id: process.env.DEFAULT_USER_ID ?? "default-user-id",
            name: "Demo User",
            email: "demo@cal.com",
            username: "demo",
            timezone: "Asia/Kolkata",
        },
    });

    console.log(`✅ User created: ${user.name}`);

    // ─────────────────────────────────────────────
    // 2. Event Types
    // ─────────────────────────────────────────────

    const quickChat = await prisma.eventType.upsert({
        where: {
            userId_slug: {
                userId: user.id,
                slug: "quick-chat",
            },
        },
        update: {},
        create: {
            userId: user.id,
            title: "Quick Chat",
            description: "A quick 15-minute intro call.",
            duration: 15,
            slug: "quick-chat",
        },
    });

    const thirtyMin = await prisma.eventType.upsert({
        where: {
            userId_slug: {
                userId: user.id,
                slug: "30-min-meeting",
            },
        },
        update: {},
        create: {
            userId: user.id,
            title: "30-Minute Meeting",
            description: "A focused 30-minute meeting to discuss your project.",
            duration: 30,
            slug: "30-min-meeting",
        },
    });

    await prisma.eventType.upsert({
        where: {
            userId_slug: {
                userId: user.id,
                slug: "deep-dive",
            },
        },
        update: {},
        create: {
            userId: user.id,
            title: "Deep Dive",
            description: "A 60-minute deep dive session.",
            duration: 60,
            slug: "deep-dive",
        },
    });

    console.log("✅ Event types seeded");

    // ─────────────────────────────────────────────
    // 3. Weekly Availability
    // ─────────────────────────────────────────────

    for (const day of [1, 2, 3, 4, 5]) {
        await prisma.availability.upsert({
            where: {
                userId_dayOfWeek: {
                    userId: user.id,
                    dayOfWeek: day,
                },
            },
            update: {
                isActive: true,
                startTime: "09:00",
                endTime: "17:00",
            },
            create: {
                userId: user.id,
                dayOfWeek: day,
                startTime: "09:00",
                endTime: "17:00",
                isActive: true,
            },
        });
    }

    for (const day of [0, 6]) {
        await prisma.availability.upsert({
            where: {
                userId_dayOfWeek: {
                    userId: user.id,
                    dayOfWeek: day,
                },
            },
            update: {
                isActive: false,
            },
            create: {
                userId: user.id,
                dayOfWeek: day,
                startTime: "09:00",
                endTime: "17:00",
                isActive: false,
            },
        });
    }

    console.log("✅ Availability seeded");

    // ─────────────────────────────────────────────
    // 4. Sample Bookings
    // ─────────────────────────────────────────────

    const nextMonday = getNextWeekday(1);

    const slot1Start = new Date(nextMonday);
    slot1Start.setUTCHours(10, 0, 0, 0);
    const slot1End = new Date(slot1Start.getTime() + 30 * 60 * 1000);

    const slot2Start = new Date(nextMonday);
    slot2Start.setUTCHours(11, 0, 0, 0);
    const slot2End = new Date(slot2Start.getTime() + 30 * 60 * 1000);

    await prisma.booking.createMany({
        data: [
            {
                userId: user.id,
                eventTypeId: thirtyMin.id,
                attendeeName: "Alice Johnson",
                attendeeEmail: "alice@example.com",
                startTime: slot1Start,
                endTime: slot1End,
                status: "CONFIRMED",
                uid: "booking-alice",
            },
            {
                userId: user.id,
                eventTypeId: thirtyMin.id,
                attendeeName: "Bob Smith",
                attendeeEmail: "bob@example.com",
                startTime: slot2Start,
                endTime: slot2End,
                status: "CONFIRMED",
                uid: "booking-bob",
            },
        ],
        skipDuplicates: true,
    });

    console.log("✅ Sample bookings created");
    console.log("🎉 Seed completed successfully");
}

function getNextWeekday(targetDay: number): Date {
    const today = new Date();
    const currentDay = today.getUTCDay();
    const daysUntil = (targetDay - currentDay + 7) % 7 || 7;

    const result = new Date(today);
    result.setUTCDate(today.getUTCDate() + daysUntil);

    return result;
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());