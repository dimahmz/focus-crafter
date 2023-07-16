const { User, validatePasswords, nameSchema } = require("../models/user");
const { resetPassword } = require("../models/resetPasswords");
const { createResponseObject } = require("../helpers/responses");
const bcrypt = require("bcrypt");
const sendEmailTo = require("../services/sendEmail");
const logger = require("../middleware/logger");
const appError = require("../helpers/appErrors");
const fs = require("fs");
require("dotenv").config();

module.exports = class UserServices {
  static async registerAnewUser(_user) {
    const default_path = `${__basedir}/static/images/profiles_imgs/default-avatar.jpg`;
    const user = new User({
      name: _user.name,
      email: _user.email,
      password: _user.password,
      settings: {},
      tasks: [{}],
      img: {
        size: 12123,
        path: default_path,
        contentType: "image/png",
      },
    });
    // hashing the password
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, slat);
    //sending activation link
    const activationLink = `verification/newUser/${user._id}/${user.verifivation_token}`;
    await sendEmailTo(user.email, activationLink);
    await user.save();
    return `${user.name} you've been signed up successfully`;
  }

  static async changeUserName(userId, name) {
    let user = await User.findOne({ name });
    // name is already taken
    if (user)
      throw new appError(
        "bad name",
        createResponseObject(
          400,
          "name is taken!",
          "the name you entred is already taken!"
        )
      );
    // check name
    const { error } = nameSchema.validate(name);
    if (error)
      throw new appError(
        "bad name",
        createResponseObject(400, "invalid name", error.details[0].message, 1)
      );
    user = await User.findById(userId).select("name");
    if (!user) throw new Error("user not found!");
    user.name = name;
    user.save();
  }

  // chage the profile image
  static async changeProfileImg(userId, file) {
    const user = await User.findById(userId).select("img");
    if (!user) throw new Error("user not found!");
    // delete old profile picture
    fs.unlink(user.img.path, (err) => {
      if (err) logger.error(err);
    });
    user.img.path = file.path;
    user.img.contentType = file.mimetype;
    user.img.size = file.size;
    await user.save();
    return user;
  }

  static async sendResetPasswordLink(user_email, user_id) {
    const resetToken = new resetPassword({ user_id: user_id });
    await resetToken.save();
    const activationLink = `resetpassword/${resetToken.user_id}/${resetToken.reset_token}`;
    await sendEmailTo(user_email, activationLink);
    return true;
  }

  static async changePassword(user_id, old_password, new_password) {
    const user = await User.findById(user_id);
    if (!user) throw new Error("user not found!");

    const { error } = validatePasswords({ old_password, new_password });
    if (error)
      throw new appError(
        "passwords aren't not matched",
        createResponseObject(
          400,
          "password is invalid!",
          error.details[0].message,
          1
        )
      );

    const validPassword = await bcrypt.compare(old_password, user.password);
    if (!validPassword)
      throw new appError(
        "passwords aren't not matched",
        createResponseObject(
          400,
          "incorrect password!",
          "The old password is invalid!",
          1
        )
      );
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, slat);
    await user.save();
    return true;
  }
};
