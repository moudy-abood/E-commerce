const models = require('../models');

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function getOne(uuid) {
  return models.User.findOne({
    where: { uuid },
    attributes: { exclude: ['id', 'password'] }
  });
}
async function update(data, uuid) {
  return models.User.update(data, { where: { uuid } });
}

async function removeUser(uuid) {
  return models.User.destroy({ where: { uuid } });
}

async function findOneMidWare(decoded) {
  return models.User.findOne({ where: { id: decoded.userId } });
}

const services = { create, getOne, update, removeUser, findOneMidWare };

module.exports = services;
