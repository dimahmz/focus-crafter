const express = require("express");
const router = express.Router();
const Responses = require("../helpers/responses");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(Responses.create(true, "The API is working", ""));
  } catch (e) {
    if (e?.customeError) return res.status(e.statusCode).send(e.errorResponse);
    return res.status(500).send(Responses.serverError(e.message));
  }
});

module.exports = router;
