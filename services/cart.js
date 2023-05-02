const models = require('../models');

async function create(cartDetails) {
  return models.Cart.create(cartDetails);
}

async function findOne(cartDetails) {
  return models.Cart.findOne(cartDetails);
}
async function update(data, cartDetails) {
  return models.Cart.update(data, cartDetails);
}

const services = { create, findOne, update };

module.exports = services;
