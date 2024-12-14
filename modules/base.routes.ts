import express from "express";
import userRouter from "./user/user.routes";

const baseRouter = express.Router();

baseRouter.use("/user", userRouter);

export default baseRouter;
