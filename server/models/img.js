const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  size: Number,
  path: String,
  contentType: String,
})


module.exports = imgSchema ;