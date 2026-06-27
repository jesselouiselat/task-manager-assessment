import app from "./app.js";
import sequelize from "./configs/db.js";
import { ENV } from "./configs/env.js";
import { User, Task } from "./modules/index.js";

const port = ENV.PORT;

const seedTasksWithUser = async () => {
  try {
    const taskCount = await Task.count();
    if (taskCount === 0) {
      const adminEmail = await User.findOne({
        where: { email: "admin@email.com" },
      });

      await Task.bulkCreate([
        {
          title: "Task 1",
          content: "content for task 1",
          userId: adminEmail.id,
        },
        {
          title: "Task 2",
          content: "content for task 2",
          userId: adminEmail.id,
        },
        {
          title: "Task 3",
          content: "content for task 3",
          userId: adminEmail.id,
        },
        {
          title: "Task 4",
          content: "content for task 4",
          userId: adminEmail.id,
        },
        {
          title: "Task 5",
          content: "content for task 5",
          userId: adminEmail.id,
        },
        {
          title: "Task 6",
          content: "content for task 6",
          userId: adminEmail.id,
        },
      ]);
      console.log("\n Sample tasks added");
    }
  } catch (error) {
    console.error(error);
  }
};

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("\n-=-=DB connection established successfully-=-=\n");

    if (ENV.NODE_ENV === "development") {
      await sequelize.sync({ alter: false });
      console.log("\n-=-=DB tables synchronized successfully-=-=\n");
    }

    app.listen(port, () => {
      console.log(`\n-=-=-Server Running on Port ${port}-=-=-\n`);
    });
    await seedTasksWithUser();
  } catch (error) {
    console.log("Unable to start server or connecto database", error);
    process.exit(1);
  }
};

startServer();
