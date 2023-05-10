const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cartUuid: Joi.string().uuid().required(),
    temporaryAddress: Joi.object().keys({
      country: Joi.string().trim().max(50).required(),
      city: Joi.string().trim().max(50).required(),
      street: Joi.string().trim().max(50).required(),
      postalCode: Joi.number().positive().required()
    }),
    total: Joi.number().positive().required()
  })
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cartUuid: Joi.string().uuid(),
    temporaryAddress: Joi.object().keys({
      country: Joi.string().trim().max(50),
      city: Joi.string().trim().max(50),
      street: Joi.string().trim().max(50),
      postalCode: Joi.number().positive()
    }),
    total: Joi.number().positive()
  })
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    uuid: Joi.string().uuid(),
    status: Joi.string().equal('PENDING', 'DISPATCHED', 'DELIVERED')
  })
});

module.exports = { create, update, uuid };
