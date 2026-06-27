import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./modules/user/user.route.js";
import taskRouter from "./modules/task/task.route.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const allowedOrigins = [];

app.use("/api/auth", userRouter);
app.use("/api/task", taskRouter);

app.get("/test", (req, res) => {
  console.log("-=-=Working-=-=");
  res.json({
    message: "Welcome to Task Manager",
    status: "Server-client handshake is successful",
  });
});

app.use(errorHandler);

export default app;
