const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const logger = require("../middleware/logger");

router.get("/", async (req, res) => {
  res.send("this is the sing up page");
});

router.post("/", async (req, res) => {
  logger.info(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("this user is already registred!");

  try {
    user = new User((req.body.name, req.body.email, req.body.password));
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, slat);
    await user.save();

    const token = user.generateToken();
    return res.header("x-auth-token", token).send(user.name);
  } catch (e) {
    logger.error(e.message);
    return res.status(404).send(e.message);
  }
});

module.exports = router;
