const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const logger = require("../middleware/logger");
const Responses = require("../helpers/responses");

router.get("/verify/newUser/:user_id/:verification_token", async (req, res) => {
  let user = await User.findById(req.params.user_id).select(
    "name verified_account verifivation_token"
  );
  if (!user)
    res.status(500).send("user nor found", 500, Responses.userNotFound());

  if (user.verifivation_token != req.params.verification_token)
    return res
      .status(401)
      .send(
        Responses.create(
          false,
          "invalid actication link",
          "your link is either expired or invalid",
          2
        )
      );
  if (user.verified_account)
    return res
      .status(409)
      .send(
        Responses.create(
          false,
          "You're account is already verified",
          "you can log in to your account",
          1
        )
      );

  try {
    user = await User.findByIdAndUpdate(req.params.user_id, {
      verified_account: true,
    });

    res
      .status(200)
      .send(
        Responses.create(
          true,
          "You're account has been verified successfully",
          `hi ${user.name}, you have successfully verified your account! `,
          0
        )
      );
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
