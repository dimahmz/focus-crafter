const pug = require("pug");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(emailData, pugTemplatePath) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user_email,
      pass: process.env.user_password,
    },
  });

  const compiledFunction = pug.compileFile(pugTemplatePath);
  const emailHTML = compiledFunction(emailData);

  // @TODO email not send
  let info = await transporter.sendMail({
    from: process.env.user_email,
    to: emailData.email_receiver,
    subject: emailData.subject,
    text: emailData.text,
    html: emailHTML,
  });

  return info;
}

module.exports = sendMail;
