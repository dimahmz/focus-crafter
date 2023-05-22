const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { createResponseObject } = require("../helpers/responses");
const Joi = require("joi");

router.get("/", (req, res) => {
  res.json(createResponseObject({ title: "this is the auth page" }));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name }).select(
    "-verifivation_token"
  );
  if (!user)
    return res.status(400).send({
      title: "Invalid credentials ",
      text: "password or name is invalid!",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("password or name is invalid!");

  if (!user.verified_account)
    return res
      .status(200)
      .send(
        "account is not verified! we've sent you a link to your email adress to activate your account."
      );
  const token = user.generateToken();
  user.password = "";
  return res.json({ "x-auth-token": token, user });
});

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}
module.exports = router;
