import type { Request } from "express";

import { changeUserRoleDTO, createUserDTO, loginUserDTO } from "./user.dtos";
import prisma from "../../config/prisma.config";
import { AppError } from "../../middlewares/errors.middlewares";
import bcrypt from "bcrypt";
import jsonwebToken from "jsonwebtoken";
import type { Role } from "@prisma/client";
/**
 * Utility function to generate token
 *
 */
const generateToken = (user: { id: string; role: Role }, expiresIn: string = "1d") => {
  const token = jsonwebToken.sign(user, process.env.JWT_SECRET!, {
    expiresIn,
  });
  return token;
};

/** 
  Get all users
  @returns {Promise<User[]>}
*/
const getAllUsers = async () => {
  return await prisma.user.findMany();
};

/**
 * Get Profile
 * @param req
 * @returns User
 */
const getProfile = async (req: Request) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};
/**
 *
 * @param req
 * @returns User
 */

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

/**
 * Login user services
 * @param req
 * @returns User, token
 */
const login = async (req: Request) => {
  const { email, password } = loginUserDTO.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }
  const token = generateToken({ id: user.id, role: user.role }, "1d");
  return { user, token };
};

const changeUserRole = async (req: Request) => {
  const { role, userId } = changeUserRoleDTO.parse(req.body);

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: role,
    },
  });

  return user;
};
export { createUserService, getAllUsers, login, getProfile, changeUserRole };
