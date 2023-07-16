const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const upload = require("../middleware/upload");
const UserServices = require("../services/userServices");
const SettingsServices = require("../services/settingsServices");
const logger = require("../middleware/logger");
const { createResponseObject } = require("../helpers/responses");
const fs = require("fs");

// Change settings
router.put("/settings", auth, async (req, res) => {
  try {
    await SettingsServices.changeSettings(
      req.user._id,
      req.body.settingsUpdate
    );
    res
      .status(200)
      .send(
        createResponseObject(
          200,
          "settings has been updated",
          "settings has been updated!",
          0
        )
      );
  } catch (e) {
    if (e?.errorObj)
      res
        .status(e.errorObj.statusCode)
        .send(
          createResponseObject(400, e.errorObj.title, e.errorObj.description, 1)
        );
    logger.error(e.message);
    res
      .status(500)
      .send(
        createResponseObject(
          500,
          e.message,
          "an internal server error has occurred, please try again later!",
          5
        )
      );
  }
});

// Change name
router.put("/name", auth, async (req, res) => {
  try {
    await UserServices.changeUserName(req.user._id, req.body.name);
    res
      .status(200)
      .send(
        createResponseObject(
          200,
          "name updated",
          "name has been updated successfully",
          0
        )
      );
  } catch (e) {
    // custom error
    if (e?.errorObj) {
      return res.status(e.errorObj.statusCode).send(e.errorObj);
    }

    // logging in a file of errors
    logger.error(e.message);

    // general error
    res
      .status(500)
      .send(
        createResponseObject(
          500,
          e.message,
          "an internal server error has occurred, please try again later!",
          5
        )
      );
  }
});

// Change profile
router.put("/profile", auth, upload.single("profile"), async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .send(
        createResponseObject(
          400,
          "file not uploaded",
          "no file was uploaded",
          1
        )
      );

  try {
    if (req.file.size > 2000000)
      throw new Error(
        "file is larger",
        createResponseObject(400, "large image's size", "file is too large", 1)
      );
    if (
      !["image/png", "image/jpeg", "image/jpg", "image/jfif"].includes(
        req.file.mimetype
      )
    )
      throw new Error(
        "file is larger",
        createResponseObject(400, "Upload only images", "Upload only images", 1)
      );

    await UserServices.changeProfileImg(req.user._id, req.file);
    res
      .status(200)
      .send(
        createResponseObject(
          200,
          "image profile updated",
          "successfully updated the image",
          0
        )
      );
  } catch (e) {
    fs.unlink(req.file.path, (err) => {
      if (err) logger.error(err);
    });

    if (e?.errorObj) return res.status(e.errorObj.statusCode).send(e.errorObj);

    logger.error(e.message);

    res
      .status(500)
      .send(
        createResponseObject(
          500,
          e.message,
          "an internal server error has occurred, please try again later!",
          5
        )
      );
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
    res
      .status(200)
      .send(
        createResponseObject(
          200,
          "password updated",
          "password has been updated!",
          0
        )
      );
  } catch (e) {
    if (e?.errorObj) return res.status(e.errorObj.statusCode).send(e.errorObj);
    logger.error(e.message);
    res
      .status(500)
      .send(
        createResponseObject(
          500,
          e.message,
          "an internal server error has occurred, please try again later!",
          5
        )
      );
  }
});

// change email
router.put("/email", auth, async (req, res) => {
  try {
    await UserServices.changeEmail(req.user, req.body.new_email);
    res
      .status(200)
      .send(
        createResponseObject(
          200,
          "email has been changed!",
          "to use this new email you to confirm it, we've sent you an activation in your old email",
          0
        )
      );
  } catch (e) {
    if (e?.errorObj) return res.status(e.errorObj.statusCode).send(e.errorObj);
    logger.error(e.message);
    res
      .status(500)
      .send(
        createResponseObject(
          500,
          e.message,
          "an internal server error has occurred, please try again later!",
          5
        )
      );
  }
});

module.exports = router;
