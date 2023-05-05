const models = require('../models');

async function bulkCreate(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function findAll() {
  return models.Product.findAll({ attributes: { exclude: ['id'] } });
}

async function findOne(uuid) {
  return models.Product.findOne({
    where: { uuid },
    attributes: { exclude: ['id'] }
  });
}
async function update(data, uuid) {
  return models.Product.update(data, { where: { uuid } });
}

async function remove(uuid) {
  return models.Product.destroy({ where: { uuid } });
}

const services = { bulkCreate, findAll, findOne, update, remove };

module.exports = services;
