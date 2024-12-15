import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies["auth_token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
