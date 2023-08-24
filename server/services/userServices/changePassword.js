const { User, validatePasswords } = require("../../models/user");
const Responses = require("../../helpers/responses");
const bcrypt = require("bcrypt");
const AppError = require("../../helpers/appErrors");

async function changePassword(user_id, old_password, new_password) {
  const user = await User.findById(user_id);

  if (!user)
    throw new AppError("user nor found", 500, Responses.userNotFound());

  const { error } = validatePasswords({ old_password, new_password });

  if (error)
    throw new AppError(
      "passwords aren't not matched",
      400,
      Responses.create(
        false,
        "password is invalid!",
        error.details[0].message,
        2
      )
    );

  const validPassword = await bcrypt.compare(old_password, user.password);
  if (!validPassword)
    throw new AppError(
      "passwords aren't not matched",
      401,
      Responses.create(
        false,
        "incorrect password!",
        "The old password is invalid!",
        2
      )
    );
  const slat = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(new_password, slat);
  await user.save();
  return true;
}

module.exports = changePassword;
