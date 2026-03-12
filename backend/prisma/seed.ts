import "dotenv/config";
import { PrismaClient } from "@prisma/client";
// @ts-ignore
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool as any);

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Starting seed...");

    const user = await prisma.user.upsert({
        where: { email: "demo@cal.com" },
        update: {},
        create: {
            id: process.env.DEFAULT_USER_ID ?? "default-user-id",
            name: "Demo User",
            email: "demo@cal.com",
            timezone: "Asia/Kolkata",
        },
    });

    console.log("✅ User created");

    const quickChat = await prisma.eventType.upsert({
        where: { slug: "quick-chat" },
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
        where: { slug: "30-min-meeting" },
        update: {},
        create: {
            userId: user.id,
            title: "30-Minute Meeting",
            description: "A focused 30-minute meeting.",
            duration: 30,
            slug: "30-min-meeting",
        },
    });

    await prisma.eventType.upsert({
        where: { slug: "deep-dive" },
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

    for (const day of [1, 2, 3, 4, 5]) {
        await prisma.availability.upsert({
            where: {
                userId_dayOfWeek: {
                    userId: user.id,
                    dayOfWeek: day,
                },
            },
            update: {},
            create: {
                userId: user.id,
                dayOfWeek: day,
                startTime: "09:00",
                endTime: "17:00",
                isActive: true,
            },
        });
    }

    console.log("✅ Availability seeded");

    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + ((8 - nextMonday.getDay()) % 7));

    const start = new Date(nextMonday);
    start.setHours(10, 0, 0, 0);

    const end = new Date(start.getTime() + 30 * 60000);

    await prisma.booking.create({
        data: {
            eventTypeId: thirtyMin.id,
            guestName: "Alice Johnson",
            guestEmail: "alice@example.com",
            startTime: start,
            endTime: end,
        },
    });

    console.log("✅ Sample booking created");
    console.log("🎉 Seed complete");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());