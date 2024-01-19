const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  size: {
    type: Number,
    default: 0,
  },
  path: {
    type: String,
    default: "",
  },
  contentType: {
    default: "",
    type: String,
  },
});

module.exports = imgSchema;
