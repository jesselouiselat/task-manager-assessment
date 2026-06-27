import { Router } from "express";
import { authenticateUser } from "../../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "./task.controller.js";

const taskRouter = Router();

taskRouter.get("/", authenticateUser, getAllTasks);
taskRouter.post("/create", authenticateUser, createTask);
taskRouter.put("/:taskId", authenticateUser, updateTask);
taskRouter.delete("/:taskId", authenticateUser, deleteTask);

export default taskRouter;
