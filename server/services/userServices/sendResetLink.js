const AppError = require("../../helpers/appErrors");
const { setNewPassword } = require("../../helpers/emailMessages");
const Responses = require("../../helpers/responses");
const logger = require("../../middleware/logger");
const { resetPasswordModal } = require("../../models/resetPasswords");
const { User } = require("../../models/user");
const sendEmailTo = require("../sendEmail");

async function sendResetPasswordLink(email) {
  const user = await User.findOne({ email });

  if (!user) {
    const msg = `this email : ${email} doesn't exist in the Database and a user tried to reset his password with it`;
    logger.error(msg);
    throw new AppError(
      "no user with this email",
      400,
      Responses.create(
        false,
        "user doesn't exist",
        "the email you entred dosen't belong to any user",
        2
      )
    );
  }

  let sendResetLink = await resetPasswordModal.findOne({ user_id: user._id });

  if (sendResetLink)
    throw new AppError(
      "reset link is alredy sent",
      429,
      Responses.create(
        false,
        "reset link was already send to this email",
        "please check your email, we sent you an email containing the link activation",
        1
      )
    );

  // create a new reset token model
  const resetToken = new resetPasswordModal({ user_id: user._id });

  await resetToken.save();

  const emailData = setNewPassword(
    `${process.env.app_domain_name}/resetpassword/${resetToken.user_id}/${resetToken.reset_token}`,
    email
  );

  await sendEmailTo(emailData, "views/emails/sendLinkEmail.pug");

  return true;
}

module.exports = sendResetPasswordLink;
