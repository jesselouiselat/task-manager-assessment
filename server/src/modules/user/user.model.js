import sequelize from "../../configs/db.js";
import { DataTypes } from "@sequelize/core";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required" },
        notEmpty: { msg: "Please enter a valid first name" },
        len: {
          args: [2, 100],
          msg: "Must be at leat 2 letters",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name is required" },
        notEmpty: { msg: "Please enter a valid last name" },
        len: {
          args: [2, 100],
          msg: "Must be at leat 2 letters",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Username is required" },
        notEmpty: { msg: "Please enter a valid username" },
        len: {
          args: [2, 100],
          msg: "Must be at leat 2 letters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: "Email is already registered" },
      validate: {
        isEmail: true,
        notNull: { msg: "Email name is required" },
        notEmpty: { msg: "Please enter a valid email" },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password name is required" },
        len: {
          args: [8, 100],
          msg: "Password must be at least 8 characters",
        },
        not: {
          args: [/ /],
          msg: "Password cannot contain empty spaces.",
        },
        is: {
          args: /^(?=.*\d)(?=.*[!@#$%^&*])/,
          msg: "Password must contain at least one number and one special character.",
        },
      },
    },
  },
  { timestamps: true, tableName: "users" },
);

export default User;
