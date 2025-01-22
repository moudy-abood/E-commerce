const { literal } = require('sequelize');

const models = require('../models');
const { productDataMapper } = require('../utils/helpers');

async function createProducts(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function listCategories() {
  return models.Product.findAll({
    attributes: [[literal('DISTINCT category '), 'category']]
  });
}

async function listProducts(options) {
  const { page } = options;
  const result = await models.Product.findAndCountAll({
    ...options,
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
  });
  return productDataMapper(result, page);
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

const services = {
  createProducts,
  getOne,
  update,
  removeProduct,
  listProducts,
  listCategories
};

module.exports = services;
