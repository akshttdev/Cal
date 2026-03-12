import { Request, Response, NextFunction } from "express";
import * as bookingService from "../services/booking.service";

export const listBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // ?filter=upcoming|past|all (default: all)
        const filter = (req.query.filter as "upcoming" | "past" | "all") ?? "all";
        const bookings = await bookingService.listBookings(filter);
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id as string);
        if (!booking) return res.status(404).json({ error: "Booking not found" });
        res.json(booking);
    } catch (err) {
        next(err);
    }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await bookingService.createBooking(req.body);
        res.status(201).json(booking);
    } catch (err) {
        // Conflict errors (double-booking) surface as 409
        if (err instanceof Error && err.message.includes("no longer available")) {
            return res.status(409).json({ error: err.message });
        }
        next(err);
    }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booking = await bookingService.cancelBooking(req.params.id as string);
        res.json(booking);
    } catch (err) {
        next(err);
    }
};
