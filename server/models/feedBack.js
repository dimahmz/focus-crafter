const Joi = require("joi");
const mongoose = require("mongoose");
const feedBackShcema = mongoose.Schema({
  email: {
    type: String,
    default: "anonymous",
  },
  text: {
    type: String,
    default: "",
  },
});

const FeedBack = mongoose.model("FeedBack", feedBackShcema);

function validate(feedBack) {
  const schema = Joi.object({
    text: Joi.required(),
  }).unknown();
  return schema.validate(feedBack);
}

module.exports = { FeedBack, validate };
