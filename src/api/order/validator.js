const { celebrate, Joi, Segments } = require('celebrate');

const validate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cartUuid: Joi.string().uuid(),
    temporaryAddress: Joi.object().keys({
      country: Joi.string().trim(),
      city: Joi.string().trim(),
      street: Joi.string().trim(),
      postalCode: Joi.number().positive()
    }),
    total: Joi.number().positive()
  })
});

module.exports = validate;
