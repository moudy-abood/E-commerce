const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    name: Joi.string().alphanum().max(50).required(),
    phoneNumber: Joi.number().integer().required()
  })
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(8).max(50),
    name: Joi.string().alphanum().max(50),
    phoneNumber: Joi.number().integer(),
    role: Joi.string().equal('ADMIN', 'USER')
  })
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    uuid: Joi.string().uuid()
  })
});

module.exports = { create, update, uuid };
