import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export function errorHandler(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}