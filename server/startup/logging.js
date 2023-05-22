const logger = require("../middleware/logger");
const winston = require("winston");

module.exports = () => {
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
        level: "debug",
      })
    );
  }

  process.on("uncaughtException", (er) => {
    logger.error(er.message, er);
    process.exit(1);
  });

  process.on("unhandledRejection", (er) => {
    logger.error(er.message, er);
    process.exit(1);
  });
};
