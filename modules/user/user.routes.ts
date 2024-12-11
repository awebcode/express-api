import express from "express";
import { getUser } from "./user.controllers";
const userRoutes = express.Router();

userRoutes.get("/", getUser)
export default userRoutes;
