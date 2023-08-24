const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const { User } = require("../models/user");
const Responses = require("../helpers/responses");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -verifivation_token"
    );

    res.send(Responses.create(true, "", "", 0, { user }));
  } catch (e) {
    return res.status(500).json(Responses.serverError(e.message));
  }
});

module.exports = router;
