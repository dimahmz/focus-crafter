const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/", async (req, res) => {
  res.send("this auth route");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ name: req.body.name });
  if (!user) return res.status(400).send("password or name is invalid!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("password or name is invalid!");

  const token = user.generateToken();
  return res.header("x-auth-token", token).send("logged in!");

});

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}
module.exports = router;
