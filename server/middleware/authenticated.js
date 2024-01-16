const jwt = require("jsonwebtoken");
const logger = require("./logger");
const { User } = require("../models/user");
const Responses = require("../helpers/responses");

module.exports = async function (req, res, next) {
  const token =
    req.body["x_auth_token"] ||
    req.headers["x_auth_token"] ||
    req.cookies.x_auth_token;
  if (!token)
    return res
      .status(401)
      .send(
        Responses.create(
          false,
          "token not provided",
          "request send without a token",
          1
        )
      );
  try {
    const decodedPayload = jwt.verify(token, process.env.pro_focus_jwtKey);
    const user = await User.findById(decodedPayload._id);
    // the user clould not be found
    // TODO is there a case where this can happen?
    if (!user)
      return res
        .status(401)
        .send(
          Responses.create(
            false,
            "invalid token",
            "the token you provided is invalid",
            2
          )
        );
    req.user = decodedPayload;
    next();
  } catch (error) {
    logger.error(error.message);
    return res
      .status(401)
      .send(
        Responses.create(
          false,
          "token error",
          "your token is either expired or invalid",
          2
        )
      );
  }
};
