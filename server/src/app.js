import express from "express";

const app = express();
app.use(express.json());

const allowedOrigins = [];

app.get("/test", (req, res) => {
  console.log("-=-=Working-=-=");
  res.json({ message: "Welcome to Task Manager", status: "Working!" });
});

export default app;
