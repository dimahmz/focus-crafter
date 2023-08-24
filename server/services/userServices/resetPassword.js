const bcrypt = require("bcrypt");
const AppError = require("../../helpers/appErrors");
const Responses = require("../../helpers/responses");
const {
  resetPasswordModal,
  validateResetPassword,
  verifyPasswordResetToken,
} = require("../../models/resetPasswords");
const { User } = require("../../models/user");

async function resetPassword(user_id, reset_token, passwords) {
  // verify token
  const isTokenExist = await verifyPasswordResetToken(user_id, reset_token);

  console.log(isTokenExist);
  if (!isTokenExist) invalidLinkError();

  // verify passwords
  const { error } = validateResetPassword(passwords);

  if (error) invalidPasswords(error.details[0].message);

  const user = await User.findById(user_id).select("password");

  // update password
  const slat = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(passwords.new_password, slat);

  await user.save();

  await resetPasswordModal.findOneAndDelete({ user_id, reset_token });
}

//functions that throw errorq
function invalidLinkError() {
  throw new AppError(
    "invalid Token",
    401,
    Responses.create(false, "invalid reset link", "link is broken!", 2)
  );
}
function invalidPasswords(message) {
  throw new AppError(
    "invalid password",
    400,
    Responses.create(false, "passwords error", message, 1)
  );
}

module.exports = resetPassword;
