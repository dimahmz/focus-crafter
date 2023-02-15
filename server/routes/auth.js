const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/", async (req, res) => {
  console.log(req.body);
  res.send("this auth route");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("password or email is invalid!");
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("password or email is invalid!");

  const token = user.generateToken();
  return res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string().required().email().min(8).max(255),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}
module.exports = router;
