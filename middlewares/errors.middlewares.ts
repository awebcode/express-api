import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    status: number;
    constructor(message: string, status: number=500) {
        super(message);
        this.status = status;
    }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
   return res.status(404).json({ message: "Route not found" });
    // next(new AppError("Route not found", 404));
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    
    const message= err.message || "Something went wrong";
    const status = err.status || 500;

    res.status(status).json({ 
        success: false,
        status: "error",
        statusCode: status,
        message
     });
};