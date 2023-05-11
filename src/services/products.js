const models = require('../models');

async function createProducts(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function getAll() {
  return models.Product.findAll();
}

async function getOne(uuid) {
  return models.Product.findOne({
    where: { uuid }
  });
}
async function update(data, uuid) {
  return models.Product.update(data, { where: { uuid } });
}

async function removeProduct(uuid) {
  return models.Product.destroy({ where: { uuid } });
}

const services = { createProducts, getAll, getOne, update, removeProduct };

module.exports = services;
