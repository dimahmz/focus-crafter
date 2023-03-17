const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { resetPassword, verifyPasswordResetToken } = require("../models/resetPassword.model.js");
const userServices = require("../services/userServices");
const Joi =require("joi");

router.get("/", async (req, res) => {
  res.send("reset your password page");
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(200).send("reset link has been sent to this email!");

  let resetToken = await resetPassword.findOne({ user_id: user.id });
  if (resetToken) return res.status(200).send("reset link has been sent to this email!");

  try{
   const isLinkSent = await userServices.sendResetPasswordLink(user.email, user.id);

   if (isLinkSent) res.status(200).send("reset link has been sent to this email!");
  } catch(e){
    console.log(e.message);
    return res.status(500).send("an internal server was occurred, please try again later!");
   }
});

router.get("/:user_id/:reset_token", async (req, res) => {

  //verification is made inside the resetpassword model
  const isTokenExist = await verifyPasswordResetToken(req.params.user_id,req.params.reset_token);
  if (!isTokenExist) return res.status(404).send("invalid token!");
  res.status(200).send("entre a new password");

});

router.put("/:user_id/:reset_token", async (req, res) => {
  const isTokenExist = await verifyPasswordResetToken(req.params.user_id,req.params.reset_token);
  if (!isTokenExist) return res.status(404).send("invalid link!");

  //whtat the user was not found
  const user = await User.findById(req.params.user_id);
  if (!user) throw new error("user not found!");
  const passwords={old_password: req.body.old_password, new_password: req.body.new_password};
  const {error}= validatePasswords(passwords);
  if(error) return res.status(400).send(error.message);

  try
  {
    await userServices.changePassword(user, req.body.old_password, req.body.new_password);
    res.status(200).send("password updated successfully!");
  }
  catch(e){
    if(e) return res.status(400).send(e.message);
    return res.status(500).send("an error has been occured");
  }
});

function validatePasswords(passwords){
  const schema = Joi.object({
    old_password: Joi.string().min(4).max(255).required(),
    new_password: Joi.string().min(8).max(255).required().invalid(Joi.ref("old_password")),
  });
  return schema.validate(passwords);
}

module.exports = router;
