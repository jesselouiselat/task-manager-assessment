import app from "./app.js";
import sequelize from "./configs/db.js";
import { ENV } from "./configs/env.js";
import { User, Task } from "./modules/index.js";

const port = ENV.PORT;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("\n-=-=DB connection established successfully-=-=\n");

    if (ENV.NODE_ENV === "development") {
      await sequelize.sync({ alter: false });
    }

    app.listen(port, () => {
      console.log(`\n-=-=-Server Running on Port ${port}-=-=-\n`);
    });
  } catch (error) {
    console.log("Unable to start server or connecto database", error);
    process.exit(1);
  }
};

startServer();
