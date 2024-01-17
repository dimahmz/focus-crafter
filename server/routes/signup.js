const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const registerAnewUser = require("../services/userServices/registerUser");
const Responses = require("../helpers/responses");

router.post("/", async (req, res, next) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send(
        Responses.create(false, "invalid inputs", error.details[0].message, 1)
      );

  // existed email or password
  const user_email = await User.findOne({ email: req.body.email });

  if (user_email)
    return res
      .status(409)
      .send(Responses.create(false, "email is already existed", "", 1));

  const user_name = await User.findOne({ name: req.body.name });

  if (user_name)
    return res
      .status(409)
      .send(Responses.create(false, "name is already existed", "", 1));

  try {
    const response = await registerAnewUser(req.body);
    res
      .status(200)
      .send(
        Responses.create(
          true,
          "user has been created successfully:",
          "we have sent you an email that contain a confimation link",
          0,
          { name: response.name, email: response.email }
        )
      );
  } catch (e) {
    console.log(e);
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
