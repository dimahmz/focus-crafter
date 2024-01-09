const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    default: "a task",
  },
  estimatedPomodoros: {
    type: Number,
    default: 4,
  },
  finishedPomodoros: {
    type: Number,
    default: 0,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
