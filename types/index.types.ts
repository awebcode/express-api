import express from "express";
export type RouteDefinition = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  handler: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
  protected: boolean;
  isAdmin?: boolean;
};
