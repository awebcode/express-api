import { isPermitted } from "./../../middlewares/auth.middlewares";
import express, { Router } from "express";

const userRouter: Router = express.Router();

import * as UserCtrl from "./user.controllers";
import { isAuth } from "../../middlewares/auth.middlewares";
import { Role } from "@prisma/client";
type RouteDefinition = {
  path: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  handler: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
  protected: boolean;
  isAdmin?: boolean;
};
// Define routes and their middleware requirements
const routes: RouteDefinition[] = [
  { path: "/createUser", method: "post", handler: UserCtrl.createUser, protected: false },
  { path: "/loginUser", method: "post", handler: UserCtrl.loginUser, protected: false },
  {
    path: "/users",
    method: "get",
    handler: UserCtrl.getUsers,
    protected: true,
    isAdmin: true,
  },
  { path: "/logoutUser", method: "post", handler: UserCtrl.logoutUser, protected: true },

  { path: "/profile", method: "get", handler: UserCtrl.getProfile, protected: true },
  {
    path: "/changeUserRole",
    method: "put",
    handler: UserCtrl.changeUserRole,
    protected: true,
    isAdmin: true,
  },
];

// Ensure TypeScript knows `method` is a valid HTTP method
routes.forEach((route) => {
  if (route.protected && !route.isAdmin) {
    userRouter[route.method](route.path, isAuth, route.handler);
  } else if (route.isAdmin) {
    userRouter[route.method](route.path, isAuth, isPermitted([Role.Admin]), route.handler);
  } else {
    userRouter[route.method](route.path, route.handler);
  }
});

export default userRouter;
