const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const {
  resetPassword,
  verifyPasswordResetToken,
} = require("../models/resetPassword");
const bcrypt = require("bcrypt");
const logger = require("../middleware/logger");

router.get("/", async (req, res) => {
  res.send("reset your password page");
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("reset link has been sent to this email!");

  let resetToken = await resetPassword.findOne({ user_id: user.id });
  if (resetToken) return res.send("reset link was already send!");

  resetToken = new resetPassword({ user_id: user.id });
  await resetToken.save();

  // @todo: send an email that contains a reset link  to reset password

  res.status(200).send("reset link has been sent!");
});

router.get("/:user_id/:reset_token", async (req, res) => {
  const resetToken = await verifyPasswordResetToken(
    req.params.user_id,
    req.params.reset_token
  );

  if (!resetToken) return res.status(404).send("invalid token!");

  res.status(200).send("entre a new password");
});

router.post("/:user_id/:reset_token", async (req, res) => {
  const resetToken = await verifyPasswordResetToken(
    req.params.user_id,
    req.params.reset_token
  );
  if (!resetToken) return req.status(404).send("invalid link!");

  const user = await User.findById(resetToken.user_id);
  if (!user) throw new error("user not found!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("invalid password!");

  try {
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.new_password, slat);
    await user.save();
  } catch (e) {
    logger.error(e);
    res.status(500).send("an error has been occured");
  } finally {
     await resetPassword.findOneAndDelete({ user_id: req.params.user_id, reset_token: req.params.reset_token });
  }
  res.status(200).redirect("/auth");
});

module.exports = router;
