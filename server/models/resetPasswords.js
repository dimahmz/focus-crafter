const mongoose = require("mongoose");
const crypto = require("crypto");
const Joi = require("joi");

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

const resetPasswordModal = mongoose.model(
  "ResetPasswords",
  resetPasswordSchema
);

async function verifyPasswordResetToken(user_id, reset_token) {
  const foundToken = await resetPasswordModal.findOne({
    user_id,
    reset_token,
  });
  return foundToken;
}
function validateResetPassword(passwords) {
  const schema = Joi.object({
    new_password: Joi.string().min(8).max(255).required().label("new password"),
    confirm_password: Joi.string().required().valid(Joi.ref("new_password")),
  });
  return schema.validate(passwords);
}

module.exports = {
  resetPasswordModal,
  verifyPasswordResetToken,
  validateResetPassword,
};
