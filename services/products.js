const models = require('../models');

async function bulkCreate(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function findAll(productDetails) {
  return models.Product.findAll(productDetails);
}

async function findOne(productDetails) {
  return models.Product.findOne(productDetails);
}
async function update(data, productDetails) {
  return models.Product.update(data, productDetails);
}

async function remove(productDetails) {
  return models.Product.destroy(productDetails);
}

const services = { bulkCreate, findAll, findOne, update, remove };

module.exports = services;
