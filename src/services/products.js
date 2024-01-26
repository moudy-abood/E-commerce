const models = require('../models');

async function createProducts(productDetails) {
  return models.Product.bulkCreate(productDetails);
}

async function getAll(page, pageSize) {
  const offset = (page - 1) * pageSize;

  const result = await models.Product.findAndCountAll({
    limit: pageSize,
    offset
  });
  return {
    products: result.rows,
    totalCount: result.count,
    totalPages: Math.ceil(result.count / pageSize),
    currentPage: page
  };
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

async function pagination() {
  return models.Product.findAndCountAll({
    offset: 10,
    limit: 2
  });
}

const services = { createProducts, getAll, getOne, update, removeProduct, pagination };

module.exports = services;
