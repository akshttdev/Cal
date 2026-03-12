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

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
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