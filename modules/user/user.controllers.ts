import type { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  res.json({ msg: "Users Fetched Successfully" });
};

export const createUser = (req: Request, res: Response) => {
  console.log({ reqBody: req.body });
  res.status(201).json({ msg: "User Created Successfully", data: req.body });
};

export const updateUser = (req: Request, res: Response) => {
  console.log({ reqBody: req.body });
  res
    .status(201)
    .json({ success: true, msg: "User Updated Successfully", data: req.body });
};
