const mongoose = require("mongoose");
const crypto = require("crypto");

const resetPasswordSchema = new mongoose.Schema(
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
      default: () => crypto.randomBytes(30).toString("hex"),
    },
  },
  { timestamps: true }
);

//token will be expired whithin two hours
resetPasswordSchema.index({ createdOn: 1 }, { expireAfterSeconds: 7200 });

const resetPassword = mongoose.model("ResetPasswords", resetPasswordSchema);

async function verifyPasswordResetToken(userId, token) {
  const foundToken = await resetPassword.findOne({
    user_id: userId,
    reset_token: token,
  });
  return foundToken;
}
module.exports = { resetPassword, verifyPasswordResetToken };
