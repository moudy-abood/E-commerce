const models = require('../models');

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function findExposedUser(uuid) {
  return models.User.findOne({
    where: { uuid },
    attributes: { exclude: ['id', 'password'] }
  });
}

async function findEmail(email) {
  return models.User.findOne({
    where: { email }
  });
}

async function update(data, uuid) {
  return models.User.update(data, { where: { uuid } });
}

async function removeUser(uuid) {
  return models.User.destroy({ where: { uuid } });
}

async function findUser(decoded) {
  return models.User.findOne({ where: { id: decoded.userId } });
}

const services = { create, findExposedUser, update, removeUser, findUser, findEmail };

module.exports = services;
