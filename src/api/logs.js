const { Router } = require("express");
const LogEntry = require("../models/logEntry");
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const enteries = await LogEntry.find();
    res.json(enteries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
