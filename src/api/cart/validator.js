const { celebrate, Joi, Segments } = require('celebrate');

const validate = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      quantity: Joi.number().positive().integer(),
      productId: Joi.number().id()
    })
  )
});

module.exports = validate;
