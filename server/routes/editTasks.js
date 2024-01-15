const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const Responses = require("../helpers/responses");
const TasksServices = require("../services/tasksServices");

router.post("/createTask", auth, async (req, res) => {
  try {
    await TasksServices.createTask(req.user._id, req.body.task);
    res.status(200).send(Responses.create(true, "tasks have been updated!"));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

router.delete("/deleteTask", auth, async (req, res) => {
  try {
    await TasksServices.deleteTask(req.user._id, req.body.taskIndex);
    res.status(200).send(Responses.create(true, "Task has been deleted!"));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

router.put("/selectTask", auth, async (req, res) => {
  try {
    await TasksServices.selectTask(req.user._id, req.body.taskIndex);
    res.status(200).send(Responses.create(true, "Task has been selected!"));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

router.put("/updateTask", auth, async (req, res) => {
  try {
    await TasksServices.updateTask(
      req.user._id,
      req.body.taskIndex,
      req.body.task
    );
    res.status(200).send(Responses.create(true, "Task has been edited!"));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
