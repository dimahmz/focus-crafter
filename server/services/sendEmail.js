const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async function main(receiver_email, activationLink) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user_email,
      pass: process.env.user_password,
    },
  });

  // I'll remove the Html to another file
  const button = `<button style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;"><a href="http://${process.env.app_domain_name}/${activationLink}">Click Here</a></button>`;

  let info = await transporter.sendMail({
    from: process.env.user_email,
    to: receiver_email,
    subject: "Activation link",
    text: `link activation will be expired within tow hours`,
    html: `<p>link activation will be expired within tow hours <br> If you didn't enter your email adress to sign up on this website, you can simply ignore this email.
   ${button}`,
  });
};
