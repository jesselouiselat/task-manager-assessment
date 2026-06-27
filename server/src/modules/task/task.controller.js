import { AppError, NotFoundError } from "../../utils/AppError.js";
import Task from "./task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.user;

    const allTasks = await Task.findAll({ where: { userId } });
    return res.status(200).json({ allTasks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
  const { taskId } = req.params;
  const { title, content, status } = req.body;
  const { userId } = req.user;

  const [affectedCount] = await Task.update(
    { title, content, status },
    { where: { id: taskId, userId } },
  );

  if (affectedCount === 0) throw new NotFoundError("Failed to update task");

  return res
    .status(200)
    .json({ message: `Successfully updated the task ${taskId}` });
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const affectedCount = await Task.destroy({ where: { id: taskId } });

  if (affectedCount === 0) throw new NotFoundError("Failed to delete task");

  return res.status(200).json({ message: `Task is successfully deleted` });
};
