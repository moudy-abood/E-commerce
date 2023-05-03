const models = require('../models');

async function create(addressDetails) {
  return models.Address.create(addressDetails);
}

async function findAll(id) {
  return models.Address.findAll({
    where: { userId: id },
    attributes: { exclude: ['id'] }
  });
}

async function findOne(uuid) {
  return models.Address.findOne({
    where: { uuid },
    attributes: { exclude: ['id'] }
  });
}
async function update(data, uuid) {
  return models.Address.update(data, { where: { uuid } });
}

async function remove(uuid) {
  return models.Address.destroy({ where: { uuid } });
}

const services = { create, findAll, findOne, update, remove };

module.exports = services;
