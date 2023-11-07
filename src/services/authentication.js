const models = require('../models');

async function create(userDetails) {
  return models.User.create(userDetails);
}

async function getEmail(email) {
  return models.User.findOne({
    where: { email }
  });
}

const services = { create, getEmail };

module.exports = services;
