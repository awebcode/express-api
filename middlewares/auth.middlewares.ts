import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errors.middlewares";
export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies["auth_token"];
    if (!token) {
      throw new AppError("UnAuthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded?.id) {
      throw new AppError("UnAuthorized", 401);
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
