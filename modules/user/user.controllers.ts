import type { RequestHandler } from "express";
import { AppError } from "../../middlewares/errors.middlewares";
import * as userService from "./user.services";
const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      throw new AppError("Users not found", 404);
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.createUserService(req);
    res.status(201).json({
      message: "User created successfully",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { user, token } = await userService.login(req);
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
    next(error);
  }
};

const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req);

    res.status(200).json({
      message: "User profile fetched successfully",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const changeUserRole: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.changeUserRole(req);
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
