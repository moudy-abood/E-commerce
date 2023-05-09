const { celebrate, Joi, Segments } = require('celebrate');

const validate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().max(50).required(),
    password: Joi.string().min(8),
    name: Joi.string().alphanum(),
    phoneNumber: Joi.number().integer(),
    role: Joi.string().equal('ADMIN', 'USER')
  })
});

module.exports = validate;
