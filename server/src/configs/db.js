import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { ENV } from "./env.js";

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: ENV.DB_NAME,
  user: ENV.DB_USER,
  password: ENV.DB_PASS,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  ssl: true,
  clientMinMessages: "notice",
  connectionTimeoutMillis: 30000,
});

export default sequelize;
