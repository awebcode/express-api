import type { Request } from "express";
import { createUserDTO } from "./user.dtos";
import prisma from "../../config/prisma.config";
import { AppError } from "../../middlewares/errors.middlewares";
import bcrypt from "bcrypt";
const createUserService = async (req: Request) => {
  const { email, password, name } = createUserDTO.parse(req.body);

  const isEmailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailExists) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return user;
};
export { createUserService };
