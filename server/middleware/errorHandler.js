const logger = require("./logger");
const Responses = require("../helpers/responses");
module.exports = function (err, req, res, next) {
  logger.error(err.message);
  res
    .status(500)
    .send(Responses.create(false, "a server error", err.message, 3));
};
