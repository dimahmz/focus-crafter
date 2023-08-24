const confirmEmail = (actionLink, email_receiver) => {
  return {
    headerMessage: "Confirm your email address",
    bodyMessage:
      "Click the button below to confirm your email address and activate your account.",
    actionLink,
    buttonName: "Activate",
    subject: "Account Activation",
    text: "the text of this email",
    email_receiver,
  };
};

const setNewPassword = (actionLink, email_receiver) => {
  return {
    subject: "Password Reset",
    headerMessage: "Reset Your Password",
    bodyMessage:
      "You have requested to reset your password. Click the button below to reset your password.",
    actionLink,
    buttonName: "Reset Password",
    text: `If you're having trouble clicking the button, you can also copy and paste the following link into your browser: ${actionLink}`,
    email_receiver,
  };
};

module.exports = { confirmEmail, setNewPassword };
