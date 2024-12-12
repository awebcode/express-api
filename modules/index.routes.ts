import express from "express";
import userRoutes from "./user/user.routes";
const baseRoutes = express.Router();

baseRoutes.use("/user", userRoutes);



baseRoutes.get("/", (req, res) => {
  res.json({ message: "Server up and running..." });
});
export default baseRoutes;
