import { Request, Response, NextFunction } from "express";
import * as eventTypeService from "../services/event-type.service";

export const listEventTypes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const eventTypes = await eventTypeService.listEventTypes();
        res.json(eventTypes);
    } catch (err) {
        next(err);
    }
};

export const getEventType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const et = await eventTypeService.getEventTypeById(req.params.id as string);
        if (!et) return res.status(404).json({ error: "Event type not found" });
        res.json(et);
    } catch (err) {
        next(err);
    }
};

export const createEventType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const et = await eventTypeService.createEventType(req.body);
        res.status(201).json(et);
    } catch (err) {
        next(err);
    }
};

export const updateEventType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const et = await eventTypeService.updateEventType(req.params.id as string, req.body);
        res.json(et);
    } catch (err) {
        next(err);
    }
};

export const deleteEventType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await eventTypeService.deleteEventType(req.params.id as string);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
