const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      filename: "storage/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "storage/logs/combined.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
