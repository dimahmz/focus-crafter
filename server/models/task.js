const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  title:{
    type: Number,
  },
  promodoros:{
    type: Number
  },
  notes:{
    type: String
  },

});

const Task = mongoose.model("Tasks", taskSchema)

module.exports={ Task, taskSchema };

