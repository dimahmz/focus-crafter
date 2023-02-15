const logger = require("../middleware/logger");
const winston = require("winston");

const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log", level: "info" }),
  ],
});

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
