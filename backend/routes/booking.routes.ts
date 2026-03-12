import { Router } from "express";
import {
    listBookings,
    getBooking,
    createBooking,
    cancelBooking,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", listBookings);           // ?filter=upcoming|past|all
router.post("/", createBooking);
router.get("/:id", getBooking);
router.patch("/:id/cancel", cancelBooking);

export { router as bookingRoutes };
