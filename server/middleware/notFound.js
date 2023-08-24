const Responses = require("../helpers/responses");

module.exports = function (req, res, next) {
  res
    .status(404)
    .send(
      Responses.create(
        false,
        "not found",
        "the end point you are trying to use doesn't exist",
        2
      )
    );
};
