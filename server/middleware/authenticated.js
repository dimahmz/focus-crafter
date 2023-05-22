const jwt = require("jsonwebtoken");
const logger = require("./logger");
const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  const token = req.body["x-auth-token"] || req.headers["x-auth-token"];
  if (!token) return res.status(401).send("request denied, token not provided");
  try {
    const decodedPayload = jwt.verify(token, process.env.pro_focus_jwtKey);
    const user = await User.findById(decodedPayload._id);
    // the user clould not be found
    if (!user) res.status(404).send({ error: "User not found" });
    req.user = decodedPayload;
    next();
  } catch (ex) {
    logger.error(ex.message);
    res.status(400).send("token is invalid!");
  }
};
