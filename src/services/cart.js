const models = require('../models');

async function create(cartDetails) {
  return models.Cart.create(cartDetails);
}

async function findOne(cartUuid) {
  return models.Cart.findOne({
    where: { uuid: cartUuid },
    include: { model: models.Item, include: { model: models.Product } },
    attributes: { exclude: ['id'] }
  });
}
async function update(data, cartUuid) {
  return models.Cart.update(data, { where: { uuid: cartUuid } });
}

const services = { create, findOne, update };

module.exports = services;
