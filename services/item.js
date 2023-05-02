const models = require('../models');

async function bulkCreate(itemDetails) {
  return models.Item.bulkCreate(itemDetails);
}

async function update(data, itemDetails) {
  return models.Item.update(data, itemDetails);
}

async function remove(itemDetails) {
  return models.Item.destroy(itemDetails);
}

const services = { bulkCreate, update, remove };

module.exports = services;
