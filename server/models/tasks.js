const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    default: "first task",
  },
  notes: {
    type: String,
    default: "first task's notes",
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
