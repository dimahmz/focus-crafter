const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../middleware/logger");
const Responses = require("../helpers/responses");
const mongoose = require("mongoose");

router.get("/verify/newUser/:user_id/:verification_token", async (req, res) => {
  const user_ID = req.params.user_id;

  const isValidId = mongoose.Types.ObjectId.isValid(user_ID);

  const response = Responses.create(
    false,
    "Invalid activation link",
    "your link is either expired or invalid",
    2
  );
  if (!isValidId) {
    return res.render("verification/error", response);
  }
  const user = await User.findById(user_ID).select(
    "name verified_account verifivation_token"
  );
  // User doesn't exist
  if (!user || user.verifivation_token != req.params.verification_token) {
    return res.render("verification/error", response);
  }

  // Account is already verified
  if (user.verified_account) {
    const response = Responses.create(
      false,
      "You're account is already verified",
      "You can log in to your account",
      1
    );
    return res.render("verification/activate", response);
  }

  try {
    // acativate the account
    user = await User.findByIdAndUpdate(user_ID, {
      verified_account: true,
    });
    const response = Responses.create(
      false,
      "You're account has been verified successfully",
      `hi ${user.name}, you have successfully verified your account!`,
      0
    );
    return res.render("verification/activate", response);
  } catch (e) {
    const response = Responses.serverError(e.message);
    res.render("verification/error", response);
  }
});

module.exports = router;
