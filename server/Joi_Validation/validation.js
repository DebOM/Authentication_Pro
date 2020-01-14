const Joi = require("joi");

//REGISTER VALIDATION
const registerValidation = data => {
  const userSchema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return Joi.validate(data, userSchema);
};

//LOGIN VALIDATION
const loginValidation = data => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return Joi.validate(data, loginSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
