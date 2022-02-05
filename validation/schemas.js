const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().length(6).required(),
  image: Joi.any(),
});

module.exports = {
  userSchema,
};
