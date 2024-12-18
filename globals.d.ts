import type { Role } from "@prisma/client";
import express from "express";
declare global {
  namespace Express {
    interface Request {
      user: { id: string,role:Role };
    }
    interface Response {
      locals: {
        user: {
          id: string;
        };
      };
    }
  }
}
