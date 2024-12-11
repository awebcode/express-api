import express from "express";
import baseRoutes from "./modules/index.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server up and running..." });
});

app.use("/api/v1", baseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
