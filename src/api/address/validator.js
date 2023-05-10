const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().trim().max(50).required(),
    city: Joi.string().trim().max(50).required(),
    street: Joi.string().trim().max(50).required(),
    postalCode: Joi.number().positive().integer().required()
  })
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().trim().max(50),
    city: Joi.string().trim().max(50),
    street: Joi.string().trim().max(50),
    postalCode: Joi.number().positive().integer()
  })
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    uuid: Joi.string().uuid()
  })
});

module.exports = { create, update, uuid };
