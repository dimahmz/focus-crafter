const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const userServices = require("../services/userServices");
const logger = require("../middleware/logger");

router.get("/", async (req, res) => {
  res.send("this is the sign up page");
  // throw new Error("expected error!");
});

router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user_email = await User.findOne({ email: req.body.email }),
    user_name = await User.findOne({ name: req.body.name });

  if (user_name)
    return res.status(400).send("the given name is already exsited!");
  if (user_email)
    return res.status(400).send("the given email is already exsited!");

  try {
    const response = await userServices.registerAnewUser(req.body);
    res.status(200).send(response);
  } catch (e) {
    next(e);
    return res.status(404).send(e.message);
  }
});

module.exports = router;
