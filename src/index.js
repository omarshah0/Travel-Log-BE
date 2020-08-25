const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const logs = require("./api/logs");

require("dotenv").config();

const middlewares = require("./middlewares");

const app = express();

mongoose.connect("mongodb://localhost:27017/travel-log", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcom To Node",
  });
});

app.use("/api/logs/", logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log("Listening on Port ", port);
});
