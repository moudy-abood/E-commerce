const models = require('../models');

async function create(orderDetails) {
  return models.Order.create(orderDetails);
}

async function findOne(orderDetails) {
  return models.Order.findOne(orderDetails);
}
async function update(data, orderDetails) {
  return models.Order.update(data, orderDetails);
}

async function remove(orderDetails) {
  return models.Order.destroy(orderDetails);
}

const services = { create, findOne, update, remove };

module.exports = services;
