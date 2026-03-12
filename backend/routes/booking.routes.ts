import { Router } from "express";
import {
    listBookings,
    getBooking,
    createBooking,
    cancelBooking,
    deleteBooking,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", listBookings);           // ?filter=upcoming|past|all
router.post("/", createBooking);
router.get("/:id", getBooking);
router.patch("/:id/cancel", cancelBooking);
router.delete("/:id", deleteBooking);

export { router as bookingRoutes };
