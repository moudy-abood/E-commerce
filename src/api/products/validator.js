const { celebrate, Joi, Segments } = require('celebrate');

const validate = celebrate({
  [Segments.BODY]: Joi.array().items(
    Joi.object().keys({
      category: Joi.string().trim(),
      title: Joi.string().trim(),
      description: Joi.string().trim(),
      price: Joi.number().positive()
    })
  )
});

module.exports = validate;
