const jwt = require("jsonwebtoken");
const logger = require("./middleware/logger");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("request denied, token not provided");

  try {
    const decodedPayload = jwt.verify(token, process.env.pro_focus_jwtKey);
    req.user = decodedPayload;
    next();
  } catch (ex) {
    logger.error(ex.message);
    res.status(400).send("token is invalid!");
  }
};
