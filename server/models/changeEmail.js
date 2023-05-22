const mongoose = require("mongoose");
const crypto = require("crypto");

const changeEmailSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      reuquired: true,
      unique: true,
    },
    reset_token: {
      type: String,
      reuquired: true,
      unique: true,
      default: () => crypto.randomBytes(20).toString("hex"),
    },
    new_email: {
      type: String,
      reuquired: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const changeToNewEmail = mongoose.model("ChangeEmails", changeEmailSchema);

async function verifyChangeEmailToken(userId, token) {
  const foundEmailToken = await changeToNewEmail.findOne({
    user_id: userId,
    reset_token: token,
  });
  return foundEmailToken;
}
module.exports = { changeToNewEmail, verifyChangeEmailToken };
