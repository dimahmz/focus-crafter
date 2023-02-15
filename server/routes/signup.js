const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const { UserSettings }= require("../models/settings");
const { Task } = require("../models/task");
const bcrypt = require("bcrypt");
const logger = require("../middleware/logger");



router.get("/", async (req, res) => {
  res.send("this is the sing up page");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  // .details[0].message
  
  const user_email = await User.findOne({ email: req.body.email }), 
    user_name = await User.findOne({ name: req.body.name });
  if (user_email || user_name) return res.status(400).send("the given email or name is already exsited!");
  

  try {

    const user = new User({ "name" :req.body.name, "email":req.body.email, 
        "password": req.body.password,"task": [ new Task({})], "settings": new UserSettings({})});
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, slat);
    await user.save();

    // const token = user.generateToken();
    return res.send(user.name);
    // header("x-auth-token", token).

  } catch (e) {
    logger.error(e.message);
    return res.status(404).send(e.message);
  }
});

module.exports = router;
