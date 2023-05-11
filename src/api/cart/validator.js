const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      quantity: Joi.number().positive().integer().max(7).required(),
      productId: Joi.number().id().required()
    })
  )
});

const update = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      quantity: Joi.number().positive().integer().max(7),
      productId: Joi.number().id()
    })
  )
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cartUuid: Joi.string().uuid(),
    uuid: Joi.string().uuid()
  })
});

module.exports = { create, update, uuid };
