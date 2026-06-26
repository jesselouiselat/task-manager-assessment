import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./modules/user/user.route.js";

const app = express();
app.use(express.json());
app.use(errorHandler);

const allowedOrigins = [];

app.use("/api/auth", userRouter);

app.get("/test", (req, res) => {
  console.log("-=-=Working-=-=");
  res.json({ message: "Welcome to Task Manager", status: "Working!" });
});

export default app;
