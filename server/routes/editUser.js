const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const upload = require("../middleware/upload");
const UserServices = require("../services/userServices");
const SettingsServices = require("../services/settingsServices");
const fs = require("fs");

// Change settings
router.put("/settings", auth, async (req, res) => {
  try {
    await SettingsServices.changeSettings(
      req.user._id,
      req.body.settingsUpdate
    );
    res.status(200).send("settings has been updated!");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Change name
router.put("/name", auth, async (req, res) => {
  try {
    await UserServices.changeUserName(req.user._id, req.body.name);
    res.status(200).send("name updated");
  } catch (e) {
    if (e) return res.status(400).send(e.message);
    res.status(500).send("server error");
  }
});

// Change profile
router.put("/profile", auth, upload.single("profile"), async (req, res) => {
  if (!req.file) return res.status(400).send("no file was uploaded");

  if (req.file.size > 2000000) {
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    return res.status(400).send("file is too large");
  }

  if (
    !["image/png", "image/jpeg", "image/jpg", "image/jfif"].includes(
      req.file.mimetype
    )
  ) {
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    return res.status(400).send("upload only images");
  }

  try {
    await UserServices.changeProfileImg(req.user._id, req.file);
    res.status(200).send("image profile updated");
  } catch (e) {
    if (e) return res.status(400).send(e.message);
    res.status(500).send("server error");
  }
});

// change password
router.put("/password", auth, async (req, res) => {
  try {
    await UserServices.changePassword(
      req.user._id,
      req.body.old_password,
      req.body.new_password
    );
    res.status(200).send("password has been updated!");
  } catch (e) {
    if (e) return res.status(400).send(e.message);
    res.status(500).send("server error");
  }
});

// change email
router.put("/email", auth, async (req, res) => {
  try {
    await UserServices.changeEmail(req.user, req.body.new_email);
    res.status(200).send("Email has been edited!");
  } catch (e) {
    if (e) return res.status(400).send(e.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
