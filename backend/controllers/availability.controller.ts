import { Request, Response, NextFunction } from "express";
import * as availabilityService from "../services/availability.service";
import { prisma } from "../utils/prisma";

const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID!;

export const getAvailability = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const availability = await availabilityService.getAvailability();
        res.json(availability);
    } catch (err) {
        console.error("[Availability Controller] getAvailability Error:", err);
        next(err);
    }
};

/** PUT /api/availability — bulk update entire week schedule */
export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await availabilityService.bulkUpdateAvailability(req.body);
        res.json(result);
    } catch (err) {
        console.error("[Availability Controller] updateAvailability Error:", err);
        next(err);
    }
};

/** PATCH /api/availability/:day — update a single day */
export const updateSingleDay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dayOfWeek = parseInt(req.params.day as string, 10);
        const result = await availabilityService.upsertAvailability({
            ...req.body,
            dayOfWeek,
        });
        res.json(result);
    } catch (err) {
        console.error("[Availability Controller] updateSingleDay Error:", err);
        next(err);
    }
};

/** PATCH /api/availability/timezone — update user's timezone */
export const updateTimezone = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { timezone } = req.body;
        if (!timezone) {
            res.status(400).json({ error: "timezone is required" });
            return;
        }
        const user = await prisma.user.update({
            where: { id: DEFAULT_USER_ID },
            data: { timezone },
        });
        res.json({ timezone: user.timezone });
    } catch (err) {
        console.error("[Availability Controller] updateTimezone Error:", err);
        next(err);
    }
};
