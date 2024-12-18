import jwt, { type JwtPayload } from "jsonwebtoken";
interface UserWithJwt extends JwtPayload {
  id: string;
  role: Role;
}
import type { Request, Response, NextFunction } from "express";
import { AppError } from "./errors.middlewares";
import type { Role } from "@prisma/client";
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserWithJwt;
    if (!decoded?.id) {
      throw new AppError("UnAuthorized", 401);
    }
   
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const isPermitted = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError("This route is only for specific role", 401);
    }
    next();
  };
};
