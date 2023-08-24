const logger = require("../middleware/logger");

class Responses {
  static create(
    success,
    title,
    description = "",
    errorLevel = 0,
    payload = {},
    apiError = {}
  ) {
    const response = {
      success,
      title,
      description,
      errorLevel,
      payload,
      apiError,
    };
    return response;
  }

  static serverError(message) {
    // log the error
    // @TODO send the file using winston
    logger.error(message);
    return this.create(
      false,
      "a server error",
      "an internal server error has occurred, please try again later!",
      3
    );
  }

  static userNotFound() {
    return this.create(
      false,
      "user not found",
      "an internal server has occurred please try again later",
      3
    );
  }
}

module.exports = Responses;
