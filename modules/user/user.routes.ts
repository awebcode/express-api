import express from "express";

const userRouter = express.Router();

import * as UserCtrl from "./user.controllers";
import { auth } from "../../middlewares/auth.middlewares";
userRouter.post("/createUser", UserCtrl.createUser);
userRouter.post("/loginUser", UserCtrl.loginUser);
// Apply auth middleware to all routes in userRouter

userRouter.use(auth);
userRouter.get("/users", UserCtrl.getUsers);


export default userRouter;
