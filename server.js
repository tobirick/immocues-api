const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const customerRoutes = require("./api/routes/customers");

// ENV Variables
const mode = process.env.NODE_ENV || "development";
if (mode === "development") {
  require("dotenv").config({ path: ".env.development" });
}
const port = process.env.PORT;
const database = process.env.DATABASE_URL;

// MongoDB / Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(database);

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Settings for REST Api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes
const currentVersion = "/api/v1";
app.use(`${currentVersion}/customers`, customerRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log("App is running on Port " + port);
});
