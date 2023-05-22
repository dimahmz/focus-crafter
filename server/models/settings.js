const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  promodoro_npt: {
    type: Number,
    default: 35,
  },

  shortBreak_npt: {
    type: Number,
    default: 15,
  },

  longBreak_npt: {
    type: Number,
    default: 50,
  },

  longBreakInterval: {
    type: Number,
    default: 4,
  },

  autoStartBreaks: {
    type: Boolean,
    default: false,
  },

  autoStartPromodoros: {
    type: Boolean,
    default: false,
  },

  focusMode: {
    type: Boolean,
    default: false,
  },

  selectedAlarm: {
    type: String,
    default: "https://pomofocus.io/audios/alarms/alarm-digital.mp3",
  },

  alarmVolume: {
    type: Number,
    default: 50,
  },

  rounds: {
    type: Number,
    default: 4,
  },
  notifyTime: {
    type: Number,
    default: 5,
  },
  allowNotification: {
    type: Boolean,
    default: false,
  },
});

module.exports = settingsSchema;
