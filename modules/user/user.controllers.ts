import type { Request, Response } from "express";


export const getUser = (req: Request, res: Response) => {
      res.json({ msg: "Awebcode Is Creating Server"  });
}