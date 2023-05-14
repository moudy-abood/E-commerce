const models = require('../models');

async function create(addressDetails) {
  return models.Address.create(addressDetails);
}

async function findAllUserAddresses(id) {
  return models.Address.findAll({
    where: { userId: id },
    attributes: { exclude: ['id', 'userId'] }
  });
}

async function getAddress(uuid) {
  return models.Address.findOne({
    where: { uuid },
    attributes: { exclude: ['id', 'userId'] }
  });
}
async function updateAddress(data, uuid) {
  return models.Address.update(data, { where: { uuid } });
}

async function removeAddress(uuid) {
  return models.Address.destroy({ where: { uuid } });
}

async function getAddressMidWare(uuid) {
  return models.Address.findOne({
    where: { uuid }
  });
}

const services = {
  create,
  findAllUserAddresses,
  getAddress,
  updateAddress,
  removeAddress,
  getAddressMidWare
};

module.exports = services;
