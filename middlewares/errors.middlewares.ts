import type { Request, Response, NextFunction } from "express";
import { formatErrorMessage, getStatusCode } from "../libs/utils";

export class AppError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Route not found", 404));
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Format the error message
  const message = formatErrorMessage(err);

  // Get the appropriate status code
  const status = getStatusCode(err);

  res.status(status).json({
    success: false,
    status: "error",
    statusCode: status,
    message,
  });
};
