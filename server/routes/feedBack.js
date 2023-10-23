const express = require("express");
const Responses = require("../helpers/responses");
const router = express.Router();
const FeedBackServices = require("../services/feedBackServices");
const { validate } = require("../models/feedBack");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res
        .status(401)
        .send(
          Responses.create(
            false,
            "error in the request body",
            error.details[0].message,
            1
          )
        );
    await FeedBackServices.create(req.body);
    res.status(200).send(Responses.create(true, "review has been sent!"));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
