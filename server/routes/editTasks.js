const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const TasksServices = require("../services/tasksServices");

router.post("/createTask", auth, async (req, res) => {
  try {
    await TasksServices.createTask(req.user._id, req.body.task);
    res.status(200).send("tasks have been updated!");
  } catch (e) {
    if (e) res.status(500).send(e.message);
  }
});

router.delete("/deleteTask", auth, async (req, res) => {
  try {
    await TasksServices.deleteTask(req.user._id, req.body.taskIndex);
    res.status(200).send("task has been deleted!");
  } catch (e) {
    if (e) res.status(400).send(e.message);
    res.status(500).send("server error!");
  }
});

router.put("/updateTask", auth, async (req, res) => {
  try {
    await TasksServices.updateTask(
      req.user._id,
      req.body.taskIndex,
      req.body.task
    );
    res.status(200).send("task has been updated!");
  } catch (e) {
    if (e) res.status(400).send(e.message);
    res.status(500).send("server error!");
  }
});

module.exports = router;
