const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    name: Joi.string().alphanum().max(50).required(),
    phoneNumber: Joi.number().integer().required()
  })
});

const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required()
  })
});

module.exports = { create, login };
