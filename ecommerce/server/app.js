const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const product = require("./routes/productRoute");
const connectDB = require("./db/connection");
const ErrorHandler = require("./middleware/error");

mongoose.set("strictQuery", false);

dotenv.config();
connectDB();

app.use(express.json());
//routes
app.use("/api/products", product);

app.use(ErrorHandler);
//unhandleerror

module.exports = app;
