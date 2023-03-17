const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const { User }=require("../models/user");

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password  -verifivation_token");
  res.send(user);
});

module.exports= router;