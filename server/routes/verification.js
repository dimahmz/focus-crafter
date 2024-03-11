const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../middleware/logger");
const Responses = require("../helpers/responses");
const mongoose = require("mongoose");

router.get("/verify/newUser/:user_id/:verification_token", async (req, res) => {
  const user_ID = req.params.user_id;

  const isValidId = mongoose.Types.ObjectId.isValid(user_ID);

  const invalid_link_response = Responses.create(
    false,
    "Invalid activation link",
    "your link is either expired or invalid",
    2
  );
  if (!isValidId) {
    return res.render("verification/error", invalid_link_response);
  }
  const user = await User.findById(user_ID).select(
    "name verified_account verification_token"
  );
  // User doesn't exist
  if (!user || user.verification_token != req.params.verification_token) {
    return res.render("verification/error", invalid_link_response);
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
    await User.findByIdAndUpdate(user_ID, {
      verified_account: true,
    });
    const response = Responses.create(
      false,
      "Account verification successed",
      `Hey ${user.name}, great news! Your account verification has been successfully completed.
      You can access your account by clicking the button below.`,
      0
    );
    return res.render("verification/activate", response);
  } catch (e) {
    if (process.env.NODE_ENV == "development") {
      console.log(e.message);
    }
    const response = Responses.serverError(e.message);
    res.render("verification/error", response);
  }
});

module.exports = router;
