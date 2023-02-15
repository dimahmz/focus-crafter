const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({

  promodoro:{
    type: Number,
    default:25
  },

  shortBreak:{
    type: Number,
    default:5
  },

  longBreak:{
    type: Number,
    default:30
  },

  longBreakInterval:{
    type: Number,
    default:false
  },

  autoStartBreak:{ 
    type: Boolean ,
    default:false
  },

  autoStartPromodors:{ 
    type: Boolean ,
    default:false
  },

  DarkModeWhenRunning:{ 
    type: Boolean ,
    default:false
  },

  alarmMusic:{ 
    type: String,
    default:"firstOne" 
  },

  AlarmVolume:{
    type:Number,
    default:50
  },

  notifyMe:{
    type : Boolean,
    default:false
  }

});

const UserSettings = mongoose.model("Settings" , settingsSchema);


module.exports={ UserSettings, settingsSchema };

