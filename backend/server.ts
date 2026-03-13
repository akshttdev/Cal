import "dotenv/config";
import express from "express";
import cors from "cors";

import { eventTypeRoutes } from "./routes/event-type.routes";
import { availabilityRoutes } from "./routes/availability.routes";
import { bookingRoutes } from "./routes/booking.routes";
import { publicRoutes } from "./routes/public.routes";

const app = express();
const PORT = process.env.PORT || 4000;

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const allowedOrigins = [
    "http://localhost:3000",
    "https://cal-navy-two.vercel.app"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (
                origin.includes("vercel.app") ||
                origin.includes("localhost")
            ) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/event-types", eventTypeRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/public", publicRoutes);

// Simple user info endpoint — returns the default user's timezone
app.get("/api/user", async (_req, res) => {
    const { prisma } = await import("./utils/prisma");
    const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;
    try {
        const user = await prisma.user.findUnique({
            where: { id: DEFAULT_USER_ID },
            select: { id: true, name: true, email: true, timezone: true },
        });
        res.json(user);
    } catch {
        res.status(500).json({ error: "Failed to fetch user" });
    }
});

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((_req, res) => {
    res.status(404).json({
        error: "Route not found",
    });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        console.error("[ERROR]", err);

        res.status(500).json({
            error: err.message || "Internal server error",
        });
    }
);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

export default app;