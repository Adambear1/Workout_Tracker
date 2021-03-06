const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");
const helmet = require("helmet");

// set up port and express app
const PORT = process.env.PORT || 5000;
const app = express();

// set up logger
app.use(logger("dev"));

// middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set up mongodb connection
require("./config/db")(app);
// require routes
app.use(require("./routes/db-routes.js"));
app.use(require("./routes/html-routes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
