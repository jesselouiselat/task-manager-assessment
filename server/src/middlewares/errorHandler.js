import { ENV } from "../configs/env.js";

export default function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Something went wrong!";
  let fields = {};

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    status = "fail";
    message = "Validation Error";
    err.errors.forEach((element) => {
      fields[element.path] = element.message;
    });
  }

  if (ENV.NODE_ENV === "development") {
    res.status(statusCode).json({
      status: status,
      error: err,
      fields: fields,
      message: message,
      stack: err.stack,
    });
  } else {
    if (err.isOperational || err.name === "SequelizeValidationError") {
      res.status(statusCode).json({
        status: status,
        message: message,
        fields: fields,
      });
    } else {
      console.error("Critical Error", err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong!",
      });
    }
  }
}
