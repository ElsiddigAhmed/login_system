const express = require("express");
const mongoose = require("mongoose");
const loginRouter = require("./src/routes");
const createError = require("http-errors");
const config = require("./src/config");
const app = express();

// connecting to the database, if errors then exit the process
mongoose.connect(config.db_host, config.db_configs).catch(() => process.exit());

// logger middleware
app.use(function (req, res, next) {
  console.log(`[${req.method}]: timestamp: ${new Date()} - path: ${req.path}`);
  next();
});

// using json object format
app.use(express.json());

// using web www forms input
app.use(express.urlencoded({ extended: false }));

app.use("/auth", loginRouter);

// 404 middleware
app.use(function (req, res, next) {
  // throw 404 errors to error handler
  next(createError(404, "not found"));
});

// error handler middleware
app.use(function (err, req, res, next) {
  // check if error is 404
  if (err.status === 404) {
    return res
      .status(err.status)
      .json(`cannot find service with path ${req.path}`);
  }
  // any error
  res.status(err.status).json(err.message);
});

// listening to specific port
app.listen(config.port, () => console.log(`listening on port ${config.port}`));
