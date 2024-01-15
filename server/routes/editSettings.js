const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const SettingsServices = require("../services/settingsServices");
const Responses = require("../helpers/responses");

router.put("/", auth, async (req, res) => {
  const settingsUpdate = req.body.settingsUpdate;
  try {
    await SettingsServices.changeSettings(req.user._id, settingsUpdate);
    res
      .status(200)
      .send(Responses.create(true, "settings has been updated!", ""));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
