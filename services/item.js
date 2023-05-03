const models = require('../models');

async function bulkCreate(itemDetails) {
  return models.Item.bulkCreate(itemDetails);
}

async function update(quantity, uuid) {
  return models.Item.update({ quantity }, { where: { uuid } });
}

async function remove(uuid) {
  return models.Item.destroy({ where: { uuid } });
}

const services = { bulkCreate, update, remove };

module.exports = services;
