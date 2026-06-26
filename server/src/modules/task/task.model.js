import { DataTypes } from "@sequelize/core";
import sequelize from "../../configs/db.js";
import User from "../user/user.model.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Please enter a valid title" },
        len: {
          args: [3, 100],
          msg: "Must be at leat 3 letters",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Content is required" },
        notEmpty: { msg: "Please enter a valid content" },
        len: {
          args: [2, 100],
          msg: "Must be at leat 2 letters",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "tasks", timestamps: true },
);

export default Task;
