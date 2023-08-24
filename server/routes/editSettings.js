const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticated");
const SettingsServices = require("../services/settingsServices");
const Responses = require("../helpers/responses");
const Joi = require("joi");

router.put("/", auth, async (req, res) => {
  const updateSettings = req.body.updateSettings;

  const { error } = validate(updateSettings);
  if (error)
    return res
      .status(401)
      .send(
        Responses.create(
          false,
          "settings object error",
          error.details[0].message,
          1
        )
      );
  try {
    await SettingsServices.changeSettings(req.user._id, updateSettings);
    res
      .status(200)
      .send(Responses.create(true, "settings has been updated!", ""));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

// settings object should not be empty
function validate(settings) {
  const schema = Joi.object().min(1).required();

  return schema.validate(settings);
}
module.exports = router;
