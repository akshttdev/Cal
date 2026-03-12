import { Router } from "express";
import {
    listEventTypes,
    getEventType,
    createEventType,
    updateEventType,
    deleteEventType,
} from "../controllers/event-type.controller";

const router = Router();

router.get("/", listEventTypes);
router.post("/", createEventType);
router.get("/:id", getEventType);
router.put("/:id", updateEventType);
router.delete("/:id", deleteEventType);

export { router as eventTypeRoutes };
