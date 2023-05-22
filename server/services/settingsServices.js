const { User } = require("../models/user");

module.exports = class SettingsServices {
  static async changeSettings(userId, settings) {
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found!");
    const $settings = JSON.parse(settings);
    for (const prop in user.settings) {
      if ($settings.hasOwnProperty(prop)) {
        user.settings[prop] = $settings[prop];
      }
    }
    user.save();
  }
};
