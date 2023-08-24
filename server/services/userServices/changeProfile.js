const { User } = require("../../models/user");
const Responses = require("../../helpers/responses");
const logger = require("../../middleware/logger");
const AppError = require("../../helpers/appErrors");
const fs = require("fs");

async function changeProfileImg(userId, file) {
  if (!file)
    throw new AppError(
      "file not uploaded",
      400,
      Responses.create(false, "file not uploaded", "no file was uploaded", 1)
    );

  //type other than image
  if (
    !["image/png", "image/jpeg", "image/jpg", "image/jfif"].includes(
      file.mimetype
    )
  )
    throw new AppError(
      "file is larger",
      400,
      Responses.create(true, "Upload only images", "Upload only images", 1)
    );

  // size excedes 2 mega bytes
  if (file.size > 2000000)
    throw new AppError(
      "file is larger",
      413,
      Responses.create(true, "large image's size", "file is too large", 1)
    );

  const user = await User.findById(userId).select("img");

  if (!user)
    throw new AppError("user nor found", 500, Responses.userNotFound());

  const oldImg = user.img;

  // delete old profile picture
  fs.unlink(oldImg.path, (err) => {
    if (err) logger.error(err);
  });

  user.img.path = file.path;
  user.img.contentType = file.mimetype;
  user.img.size = file.size;
  await user.save();

  return user;
}

module.exports = changeProfileImg;
