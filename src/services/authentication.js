const models = require('../models');

async function getEmail(email) {
  return models.User.findOne({
    where: { email }
  });
}

const services = { getEmail };

module.exports = services;
