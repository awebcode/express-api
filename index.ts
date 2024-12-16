import express from "express";
// import { connectDB } from "./config/db.config";
import baseRouter from "./modules/base.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middlewares/errors.middlewares";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

// connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Server up and running And Pushed on github..." });
});

app.use("/api/v1", baseRouter);
// Not Found Handler (unmatched routes)
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
