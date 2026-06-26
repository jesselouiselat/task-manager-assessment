import { AppError, NotFoundError } from "../../utils/AppError.js";
import Task from "./task.model.js";

export const getAllTasks = async (req, res) => {
  const allTasks = await Task.findAll();
  return res.status(200).json({ allTasks });
};

export const createTask = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  const newTask = await Task.create({
    userId,
    title,
    content,
  });
  return res
    .status(201)
    .json({ message: `Created a new task: ${title}`, data: newTask });
};

export const updateTask = async (req, res) => {
  const { id, title, content, status } = req.body;
  const { userId } = req.user;

  const [affectedCount] = await Task.update(
    { title, content },
    { where: { id, userId, status } },
  );

  if (affectedCount === 0) throw new NotFoundError("Failed to update task");

  return res
    .status(200)
    .json({ message: `Successfully updated the task ${id}` });
};

export const deleteTask = async (req, res) => {
  const { id } = req.body;

  const affectedCount = await Task.destroy({ where: { id } });

  if (affectedCount === 0) throw new NotFoundError("Failed to delete task");

  return res.status(200).json({ message: `Task is successfully deleted` });
};
