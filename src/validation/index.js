const Joi = require("@hapi/joi");

exports.validateLogin = function (req, res, next) {
  const Schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { value, error } = Schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.map((err) => {
      const { key } = err.context;
      errors[key] = err.message;
    });
    next({ status: 400, message: errors });
  } else {
    req.data = value;
    next();
  }
};

exports.validateRegistration = function (req, res, next) {
  const Schema = Joi.object().keys({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.number().required().min(9),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
    address: Joi.string().min(2).required(),
    gender: Joi.string().required(),
  });

  const { value, error } = Schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.map((err) => {
      const { key } = err.context;
      errors[key] = err.message;
    });
    next({ status: 400, message: errors });
  } else {
    req.data = value;
    next();
  }
};
