const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const { User } = require("../models/user");

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("name  email img");
  res.send(user);
});

// @TODO
// add token to the blacklist
router.post("/logout", auth, async (req, res) => {
  res.send("ok");
});

module.exports = router;
