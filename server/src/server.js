import app from "./app.js";
import { ENV } from "./configs/env.js";

const port = ENV.PORT;

const startServer = async () => {
  app.listen(port, () => {
    console.log(`\n-=-=-Server Running on Port ${port}-=-=-\n`);
  });
};

startServer();
