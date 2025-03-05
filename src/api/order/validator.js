const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      temporaryAddress: Joi.object().keys({
        country: Joi.string().trim().max(50).required(),
        city: Joi.string().trim().max(50).required(),
        street: Joi.string().trim().max(50).required(),
        postalCode: Joi.number().greater(0).required()
      }),
      addressUuid: Joi.string().uuid(),
      total: Joi.number().positive().required()
    })
    .xor('addressUuid', 'temporaryAddress')
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
