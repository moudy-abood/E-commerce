const { celebrate, Joi, Segments } = require('celebrate');

const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required()
  })
});

module.exports = { login };
