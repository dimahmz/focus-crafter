const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required,
  },
});

const InvalidToken = mongoose.model("invalidTokens", tokenSchema);

module.exports = { InvalidToken };
