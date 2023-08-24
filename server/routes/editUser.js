const express = require("express");
const router = express.Router();
const fs = require("fs");
const auth = require("../middleware/authenticated");
const logger = require("../middleware/logger");
const upload = require("../middleware/upload");
const changeUserName = require("../services/userServices/changeName");
const changeProfile = require("../services/userServices/changeProfile");
const changePassword = require("../services/userServices/changePassword");
const Responses = require("../helpers/responses");

// Change name
router.put("/name", auth, async (req, res) => {
  try {
    await changeUserName(req.user._id, req.body.name);

    res.status(200).send(Responses.create(true, "name updated", ""));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);

    res.status(500).send(Responses.serverResponse(e.message));
  }
});

// Change profile
router.put("/profile", auth, upload.single("profile"), async (req, res) => {
  try {
    await changeProfile(req.user._id, req.file);
    res
      .status(200)
      .send(Responses.create(true, "image profile has been updated"));
  } catch (e) {
    // delete uploaded file if an error has occurred
    fs.unlink(req.file.path, (err) => {
      if (err) logger.error(err);
    });
    // return custom error if it was thrown
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    res.status(500).send(Responses.serverError(e.message));
  }
});

// change password
router.put("/password", auth, async (req, res) => {
  try {
    await changePassword(
      req.user._id,
      req.body.old_password,
      req.body.new_password
    );
    res
      .status(200)
      .send(
        Responses.create(
          true,
          "password updated",
          "password has been updated!",
          0
        )
      );
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
