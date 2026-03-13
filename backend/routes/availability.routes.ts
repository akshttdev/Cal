import { Router } from "express";
import {
    getAvailability,
    updateAvailability,
    updateSingleDay,
    updateTimezone,
} from "../controllers/availability.controller";

const router = Router();

router.get("/", getAvailability);
router.put("/", updateAvailability);              // bulk update all 7 days
router.patch("/timezone", updateTimezone);        // update user timezone (must be before /:day)
router.patch("/:day", updateSingleDay);           // update single day (0-6)

export { router as availabilityRoutes };
