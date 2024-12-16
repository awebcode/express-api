import type { Request, Response, NextFunction } from "express";

/**
 * AppError: Custom error class for consistent error handling
 */
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * NotFoundHandler: Handles unmatched routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new AppError("Route not found", 404));
};

/**
 * Global Error Handler: Processes errors and sends JSON responses
 */
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction // Required for middleware signature, even if unused
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  //   console.error(`[Error]: ${message}, stack: ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    status: "error",

    error: {
      message,
      statusCode,
    },
  });
};
