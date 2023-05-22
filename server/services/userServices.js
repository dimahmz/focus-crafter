const { User, validatePasswords } = require("../models/user");
const { resetPassword } = require("../models/resetPasswords");
const { changeToNewEmail } = require("../models/changeEmail");
const bcrypt = require("bcrypt");
const sendEmailTo = require("../services/sendEmail");
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
    if (user) throw new Error("name is taken!");
    user = await User.findById(userId).select("name");
    if (!user) throw new Error("user not found!");
    user.name = name;
    user.save();
  }

  static async changeProfileImg(userId, file) {
    const user = await User.findById(userId).select(
      "-password  -verifivation_token"
    );
    if (!user) throw new Error("user not found!");
    // console.log(file);
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

    // !
    const { error } = validatePasswords({ old_password, new_password });
    if (error) throw new Error(error.message);

    const validPassword = await bcrypt.compare(old_password, user.password);
    if (!validPassword) throw new Error("The old password is invalid!");

    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, slat);
    await user.save();
    await resetPassword.findOneAndDelete({ user_id: user.id });
    return true;
  }

  // change a user's email
  static async changeEmail(user, new_email) {
    if (user.email == new_email) return;
    const isEmailTaken = await User.findOne({ email: new_email });
    if (isEmailTaken) throw new Error("email is taken");
    const newEmailModal = new changeToNewEmail({
      user_id: user._id,
      new_email,
    });
    await newEmailModal.save();
    const activationLink = `verification/verify/newEmail/${user._id}/${newEmailModal.reset_token}`;
    await sendEmailTo(newEmailModal.new_email, activationLink);
  }
};
