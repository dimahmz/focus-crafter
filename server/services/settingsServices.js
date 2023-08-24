const { User } = require("../models/user");
const AppError = require("../helpers/appErrors");
const logger = require("../middleware/logger");
const Responses = require("../helpers/responses");

module.exports = class SettingsServices {
  static async changeSettings(userId, newSettings) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("user not found!", 500, Responses.userNotFound());
    }

    //  stores the documents as javascript object
    for (const prop in user.settings) {
      if (newSettings.hasOwnProperty(prop)) {
        user.settings[prop] = newSettings[prop];
      }
    }
    user.save();
  }
};
