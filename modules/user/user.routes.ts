import express from "express";
import { createUser, getUser, updateUser } from "./user.controllers";
const userRoutes = express.Router();


userRoutes.get("/users", getUser).put("/updateUser", updateUser);
userRoutes.post("/createUser", createUser);


export default userRoutes;
