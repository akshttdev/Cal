import { Request, Response, NextFunction } from "express";
import * as availabilityService from "../services/availability.service";

export const getAvailability = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const availability = await availabilityService.getAvailability();
        res.json(availability);
    } catch (err) {
        next(err);
    }
};

/** PUT /api/availability — bulk update entire week schedule */
export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Body: Array of { dayOfWeek, startTime, endTime, isActive }
        const result = await availabilityService.bulkUpdateAvailability(req.body);
        res.json(result);
    } catch (err) {
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
        next(err);
    }
};
