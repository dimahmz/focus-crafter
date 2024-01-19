const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../middleware/logger");
const Responses = require("../helpers/responses");

router.get("/verify/newUser/:user_id/:verification_token", async (req, res) => {
  const id = req.params.user_id;
  const user = await User.findById(id).select(
    "name verified_account verifivation_token"
  );
  if (!user) {
    const response = Responses.create(
      false,
      "invalid actication link",
      "your link is either expired or invalid",
      2
    );

    return res.render("verification/activate", response);
  }
  if (user.verifivation_token != req.params.verification_token) {
    const response = Responses.create(
      false,
      "invalid actication link",
      "your link is either expired or invalid",
      2
    );
    return res.render("verification/activate", response);
  }
  if (user.verified_account) {
    const response = Responses.create(
      false,
      "You're account is already verified",
      "you can log in to your account",
      1
    );
    return res.render("verification/activate", response);
  }

  try {
    user = await User.findByIdAndUpdate(req.params.user_id, {
      verified_account: true,
    });
    const response = Responses.create(
      false,
      "You're account has been verified successfully",
      `hi ${user.name}, you have successfully verified your account! `,
      0
    );
    return res.render("verification/activate", response);
  } catch (e) {
    if (e?.customeError) {
      return res.render("verification/activate", e.errorResponse);
    }
    const response = Responses.serverError(e.message);
    res.render("verification/activate", response);
  }
});

module.exports = router;
