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
          content:
            "Aliquam dolor mauris, interdum vel urna at, luctus pretium felis. Aenean pharetra nibh ut erat.",
          userId: adminEmail.id,
        },
        {
          title: "Task 2",
          content:
            "Pellentesque rutrum nulla eu odio varius, eget tempor magna gravida. Lorem ipsum dolor sit amet.",
          userId: adminEmail.id,
        },
        {
          title: "Task 3",
          content: "Donec vel felis dui. Fusce est dui, ullamcorper et enim.",
          userId: adminEmail.id,
        },
        {
          title: "Task 4",
          content:
            "Praesent scelerisque, dui sed mollis lobortis, ante ante varius arcu.",
          userId: adminEmail.id,
        },
        {
          title: "Task 5",
          content:
            "Aliquam tellus sapien, vehicula ut sapien vel, accumsan mattis tortor.",
          userId: adminEmail.id,
        },
        {
          title: "Task 6",
          content:
            "Curabitur aliquet orci ultricies justo accumsan commodo eget eu felis.",
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
