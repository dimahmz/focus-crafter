const { User, nameSchema } = require("../../models/user");
const Responses = require("../../helpers/responses");
const AppError = require("../../helpers/appErrors");
require("dotenv").config();

async function changeUserName(userId, name) {
  let user = await User.findOne({ name });
  // name is already taken
  if (user)
    throw new AppError(
      "bad name",
      409,
      Responses.create(
        false,
        "name is taken!",
        "the name you entred is already taken!",
        1
      )
    );
  // check name
  const { error } = nameSchema.validate(name);

  if (error)
    throw new AppError(
      "bad name",
      400,
      Responses.create(false, "invalid name", error.details[0].message, 1)
    );

  user = await User.findById(userId).select("name");

  if (!user)
    throw new AppError("user nor found", 500, Responses.userNotFound());

  user.name = name;

  user.save();
}

module.exports = changeUserName;
