import { Router, Request, Response, NextFunction } from "express";
import * as eventTypeService from "../services/event-type.service";
import { getAvailableSlots } from "../services/slot.service";

const router = Router();

/**
 * GET /api/public/event-types/:slug
 * Returns public-facing event type info for the booking page.
 * Does NOT require auth.
 */
router.get(
    "/event-types/:slug",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const et = await eventTypeService.getEventTypeBySlug(req.params.slug as string);
            if (!et || !et.isActive) {
                return res.status(404).json({ error: "Event type not found" });
            }
            // Return only the fields the public page needs
            res.json({
                id: et.id,
                title: et.title,
                description: et.description,
                duration: et.duration,
                slug: et.slug,
            });
        } catch (err) {
            next(err);
        }
    }
);

/**
 * GET /api/public/slots?slug=&date=YYYY-MM-DD
 * Returns available time slots for a given event type slug and date.
 * Core slot generation endpoint used by the public booking calendar.
 */
router.get(
    "/slots",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { slug, date } = req.query as { slug: string; date: string };

            if (!slug || !date) {
                return res.status(400).json({ error: "slug and date are required" });
            }

            // Validate date format YYYY-MM-DD
            if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return res.status(400).json({ error: "date must be in YYYY-MM-DD format" });
            }

            const slots = await getAvailableSlots({ slug, date });
            res.json(slots);
        } catch (err) {
            next(err);
        }
    }
);

export { router as publicRoutes };
