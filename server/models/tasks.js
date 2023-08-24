const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    default: "a task",
  },
  notes: {
    type: String,
    default: "a task's notes",
  },
  estimatedPromodoros: {
    type: Number,
    default: 4,
  },
  finishedPromdoros: {
    type: Number,
    default: 4,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
