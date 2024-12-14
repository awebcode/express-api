import express from "express";

const userRouter = express.Router();

import * as UserCtrl from "./user.controllers";

userRouter.get("/users", UserCtrl.getUsers);
userRouter.post("/createUser", UserCtrl.createUser);
userRouter.post("/loginUser", UserCtrl.loginUser);

export default userRouter;
