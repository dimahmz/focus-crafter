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
    const response = Responses.create(true, "", "", 0, { user });
    res.send(response);
  } catch (e) {
    res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
