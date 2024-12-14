import express from "express";
import { connectDB } from "./config/db.config";
import baseRouter from "./modules/base.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Server up and running And Pushed on github..." });
});

app.use("/api/v1", baseRouter);

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
