const { User } = require("../models/user");
const AppError = require("../helpers/appErrors");
const logger = require("../middleware/logger");
const { FeedBack } = require("../models/feedBack");
const Responses = require("../helpers/responses");

module.exports = class FeedBackServices {
  static async create(feedBack) {
    const email = feedBack?.email;
    const text = feedBack?.text;
    await FeedBack.create({
      email,
      text,
    });
  }
};
