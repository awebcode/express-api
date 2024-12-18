import type { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma.config";
import bcrypt from "bcrypt";
import jsonwebToken from "jsonwebtoken";
import { AppError } from "../../middlewares/errors.middlewares";
import * as userService from "./user.services";
import { changeUserRoleDTO } from "./user.dtos";
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      throw new AppError("Users not found", 404);
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
   const user=await userService.createUserService(req);
    res.status(201).json({
      message: "User created successfully",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = await jsonwebToken.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Server Error" });
  }
};

const logoutUser = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Server Error" });
  }
};

const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200).json({
      message: "User profile fetched successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Server Error" });
  }
};

const changeUserRole = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { role, userId } = changeUserRoleDTO.parse(req.body);
    
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
    
    res.status(200).json({
      message: "User role updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export { getUsers, createUser, loginUser, logoutUser, getProfile, changeUserRole };
