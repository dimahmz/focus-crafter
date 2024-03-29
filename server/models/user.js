const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const settingsSchema = require("./settings");
const imgSchema = require("./img");
const taskSchema = require("./tasks");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 255,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 14,
    maxlength: 255,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },

  img: imgSchema,

  verified_account: {
    type: Boolean,
    default: false,
  },

  verification_token: {
    type: String,
    required: true,
    default: () => crypto.randomBytes(20).toString("hex"),
  },

  tasks: [taskSchema],

  settings: settingsSchema,
});

// methos related to the User

// generate a token to be used in the cliet-side
userSchema.methods.generateToken = function () {
  const expiresIn = 365 * 24 * 3600;
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.pro_focus_jwtKey,
    {
      expiresIn,
    }
  );
};

const User = mongoose.model("User", userSchema);

// validate the user in the sign up
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().required().email().min(8).max(255),
    password: Joi.string().required().min(8).max(255),
    repeat_password: Joi.ref("password"),
  });
  return schema.validate(user);
}
// validate email
function validateEmail(email) {
  const schema = Joi.string().email().required();
  return schema.validate(email);
}
// User properties to validate when updating user
const nameSchema = Joi.string().required().min(4).max(255);
const emailSchema = Joi.string().email().required();

// validate the updation of a new password
function validatePasswords(passwords) {
  const schema = Joi.object({
    old_password: Joi.string().min(4).max(255).required(),
    new_password: Joi.string()
      .min(8)
      .max(255)
      .required()
      .invalid(Joi.ref("old_password")),
  });
  return schema.validate(passwords);
}

module.exports = {
  User,
  validate: validateUser,
  validatePasswords,
  validateEmail,
  nameSchema,
  emailSchema,
};
