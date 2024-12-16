import express from "express";
declare global {
  namespace Express {
    interface Request {
      user: { id: string };
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
