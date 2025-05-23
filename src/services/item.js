const models = require('../models');

async function addItemsToCart(itemDetails) {
  return models.Item.bulkCreate(itemDetails);
}

async function update(quantity, uuid) {
  return models.Item.update({ quantity }, { where: { uuid } });
}

async function removeItem(uuid) {
  return models.Item.destroy({ where: { uuid } });
}

async function findItem(uuid) {
  return models.Item.findOne({ where: { uuid } });
}

const services = { addItemsToCart, update, removeItem, findItem };

module.exports = services;
