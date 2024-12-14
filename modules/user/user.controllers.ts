import type { Request, Response } from "express";
import prisma from "../../config/prisma.config";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Server Error" });
  }
};

export { getUsers, createUser };
