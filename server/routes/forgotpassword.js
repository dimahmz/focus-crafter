const express = require("express");
const router = express.Router();
const { validateEmail } = require("../models/user");
const sendResetPasswordLink = require("../services/userServices/sendResetLink");
const resetPassword = require("../services/userServices/resetPassword");
const Responses = require("../helpers/responses");

// accept email adress to send a reset link to the user
router.post("/", async (req, res) => {
  const { error } = validateEmail(req.body.email);

  if (error) {
    return res
      .status(400)
      .send(
        Responses.create(false, "invalid email", error.details[0].message, 1)
      );
  }

  try {
    const isLinkSent = await sendResetPasswordLink(req.body.email);

    if (isLinkSent)
      res
        .status(200)
        .send(
          successResponse("reset link has been send to this email suceessfully")
        );
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

// reset link to update the password
router.put("/:user_id/:reset_token", async (req, res) => {
  const passwords = {
    new_password: req.body.new_password,
    confirm_password: req.body.confirm_password,
  };

  try {
    await resetPassword(req.params.user_id, req.params.reset_token, passwords);

    res
      .status(200)
      .send(successResponse("password has been change successfully"));
  } catch (e) {
    console.log(e);
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

function successResponse(message = "", description = "") {
  return Responses.create(true, message, description, 0);
}

module.exports = router;
