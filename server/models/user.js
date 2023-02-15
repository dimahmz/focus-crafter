const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { UserSettings , settingsSchema } = require("./settings");
const { Task , taskSchema }= require("./task");
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

  verified_account:{
    type:Boolean,
    default:false
  },

  verifivation_token:{
    type:String,
    required:true,
    default: () => crypto.randomBytes(20).toString('hex'),
  },
  
  task:[ taskSchema ],
  
  settings: settingsSchema

});

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id, admin: this.admin }, process.env.pro_focus_jwtKey);
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().required().email().min(8).max(255),
    password: Joi.string().required().min(8).max(255),
    repeat_password: Joi.ref('password'),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
