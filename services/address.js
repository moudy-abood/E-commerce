const models = require('../models');

async function create(addressDetails) {
  return models.Address.create(addressDetails);
}

async function findAll(addressDetails) {
  return models.Address.findAll(addressDetails);
}

async function findOne(addressDetails) {
  return models.Address.findOne(addressDetails);
}
async function update(data, addressDetails) {
  return models.Address.update(data, addressDetails);
}

async function remove(addressDetails) {
  return models.Address.destroy(addressDetails);
}

const services = { create, findAll, findOne, update, remove };

module.exports = services;
