const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    name: Joi.string().max(50).required(),
    phoneNumber: Joi.number().integer().required()
  })
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().max(50),
    phoneNumber: Joi.number().integer(),
    role: Joi.string().equal('ADMIN', 'USER')
  })
});

const updatePassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    oldPassword: Joi.string().min(8).max(50).required(),
    newPassword: Joi.string().min(8).max(50).required()
  })
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    uuid: Joi.string().uuid()
  })
});

module.exports = { create, update, updatePassword, uuid };
