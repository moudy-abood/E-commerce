const { celebrate, Joi, Segments } = require('celebrate');

const create = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      category: Joi.string().trim().max(50).required(),
      title: Joi.string().trim().max(50).required(),
      description: Joi.string().trim().max(50).required(),
      price: Joi.number().positive().required()
    })
  )
});

const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    category: Joi.string().trim().max(50),
    title: Joi.string().trim().max(50),
    description: Joi.string().trim().max(50),
    price: Joi.number().positive()
  })
});

const uuid = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    uuid: Joi.string().uuid()
  })
});

module.exports = { create, update, uuid };
