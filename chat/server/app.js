const express = require("express");
const app = express();
const dotenv = require("dotenv");
const body = require("body-parser");

const { serverError } = require("./middleware/errorMiddleware");
const user = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const connectDB = require("./config/db");
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
dotenv.config();

app.use(body.json());
app.use(serverError);
app.use(body.urlencoded({ extended: true }));
app.use(express.json());

app.use("/uploads", express.static("./uploads"));
app.use("/auth", user);
app.use("/api/chat", chatRoutes);
app.use(notFound);

connectDB();

module.exports = app;
