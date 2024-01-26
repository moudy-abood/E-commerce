const models = require('../models');
const { productDataMapper } = require('../utils/helpers');

async function createProducts(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function getAll(page, pageSize) {
  const offset = (page - 1) * pageSize;

  const result = await models.Product.findAndCountAll({
    limit: pageSize,
    offset
  });
  return productDataMapper(result, page, pageSize);
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
