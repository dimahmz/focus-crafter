const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Responses = require("../helpers/responses");
const Joi = require("joi");
// repeated responses
const AuthErrorResponse = Responses.create(
  false,
  "Invalid credentials",
  "password or name is invalid!",
  2
);

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error)
    return res
      .status(400)
      .send(
        Responses.create(
          false,
          "Invalid input error",
          error.details[0].message,
          1
        )
      );

  try {
    let user = await User.findOne({ name: req.body.name }).select(
      "-verifivation_token"
    );

    if (!user) return res.status(400).send(AuthErrorResponse);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // invalid credentials
    if (!validPassword) return res.status(400).send(AuthErrorResponse);

    // unverified account
    if (!user.verified_account)
      return res
        .status(403)
        .send(
          Responses.create(
            false,
            "Email is Unverified!",
            "Email is unverified! we've sent you a link to your email adress to activate your account.",
            2
          )
        );
    const token = user.generateToken();
    // the user password should not be send, remeber the user model will not be saved
    user.password = "";

    return res.status(200).json(
      Responses.create(true, "logged in successfully", "", 0, {
        x_auth_token: token,
        user,
      })
    );
  } catch (e) {
    return res.status(500).json(Responses.serverError(e.message));
  }
});

// validate request body
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}
module.exports = router;
