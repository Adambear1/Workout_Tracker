const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const app = express();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout_tracker",
  { useNewUrlParser: false }
);

app.use(helmet());
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

require("./routes/html-routes")(app);
require("./routes/db-routes")(app);

app.listen(PORT, () => {
  console.log("Listening on PORT" + PORT);
});
