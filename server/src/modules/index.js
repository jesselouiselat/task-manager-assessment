import Task from "./task/task.model.js";
import User from "./user/user.model.js";

User.hasMany(Task, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
Task.belongsTo(User, {
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

export { User, Task };
