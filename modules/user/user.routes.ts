import express from "express";
import * as UserCtrl from "./user.controllers";
import { isAuth, isPermitted } from "../../middlewares/auth.middlewares";
import { Role } from "@prisma/client";
import type { RouteDefinition } from "../../types/index.types";

const userRouter= express.Router();

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

// Simplify route middleware handling
routes.forEach(({ path, method, handler, protected: isProtected, isAdmin }) => {
  const middlewares = [];

  if (isProtected) {
    middlewares.push(isAuth);
    if (isAdmin) {
      middlewares.push(isPermitted([Role.Admin]));
    }
  }

  userRouter[method](path, ...middlewares, handler);
});

export default userRouter;
