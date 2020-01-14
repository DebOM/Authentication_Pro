// import * as express from "express";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//import Routes
const appRoute = require("./routes/routes");
const authRoute = require("./routes/auth");

dotenv.config();

//connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to mongoDB")
);

//middleware
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);

app.use("/", appRoute);

app.listen(3000, () => console.log("hello, server listening on port 3000"));
