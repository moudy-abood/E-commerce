const models = require('../models');

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function findOne(uuid) {
  return models.User.findOne({
    where: { uuid },
    attributes: { exclude: ['id'] }
  });
}
async function update(data, uuid) {
  return models.User.update(data, { where: { uuid } });
}

async function remove(uuid) {
  return models.User.destroy({ where: { uuid } });
}

const services = { create, findOne, update, remove };

module.exports = services;
