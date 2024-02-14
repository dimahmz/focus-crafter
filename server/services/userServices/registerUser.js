const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const sendEmailTo = require("../sendEmail");
const AppError = require("../../helpers/appErrors");
const Responses = require("../../helpers/responses");
const { confirmEmail } = require("../../helpers/emailMessages");
require("dotenv").config();

async function registerAnewUser($user) {
  const user = new User({
    name: $user.name,
    email: $user.email,
    password: $user.password,
    img: {},
    settings: {},
    tasks: [],
  });

  // hashing the password
  const slat = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, slat);

  //sending activation link
  const emailData = confirmEmail(
    `${process.env.app_domain_name}/verification/verify/newUser/${user._id}/${user.verification_token}`,
    user.email
  );

  const emailInfo = await sendEmailTo(
    emailData,
    "views/emails/sendLinkEmail.pug"
  );

  if (!emailInfo)
    AppError(
      "email nor sent",
      500,
      Responses.create(
        false,
        "email could not be send",
        "an internal server error occurred please try again later",
        3
      )
    );
  await user.save();
  return user;
}
module.exports = registerAnewUser;
