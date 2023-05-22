const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { verifyChangeEmailToken } = require("../models/changeEmail");
const logger = require("../middleware/logger");

router.get("/verify/newUser/:user_id/:verify_token", async (req, res) => {
  let user = await User.findById(req.params.user_id).select(
    "name verified_account verifivation_token"
  );
  if (!user) return res.status(400).send("invalid activation link.");

  if (user.verifivation_token != req.params.verify_token)
    return res.status(400).send("invalid activation link!");
  if (user.verified_account)
    return res.status(200).send("account is already verified!");

  try {
    user = await User.findByIdAndUpdate(req.params.user_id, {
      verified_account: true,
    });
    res
      .status(200)
      .send(`hi ${user.name}, you have successfully verified your account! `);
  } catch (e) {
    logger.error(e.message);
    res
      .status(500)
      .send("an internal error occurred, could not verify account!");
  }
});
router.get("/verify/newEmail/:user_id/:verify_token", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select(
      "name verified_account verifivation_token"
    );
    if (!user) return res.status(400).send("invalid activation link.");

    const changeEmail = await verifyChangeEmailToken(
      req.params.user_id,
      req.params.verify_token
    );
    if (!changeEmail) return res.status(400).send("invalid activation link");
    user.email = changeEmail.new_email;
    await user.save();
    res.status(200).send(`this is ur new email ${user.email}`);
  } catch (e) {
    logger.error(e.message);
    res.status(500).send(e.message);
  }
});

module.exports = router;
