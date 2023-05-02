const models = require('../models');

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function findOne(userDetails) {
  return models.User.findOne(userDetails);
}
async function update(data, userDetails) {
  return models.User.update(data, userDetails);
}

async function remove(userDetails) {
  return models.User.destroy(userDetails);
}

const services = { create, findOne, update, remove };

module.exports = services;
