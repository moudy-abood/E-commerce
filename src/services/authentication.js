const models = require('../models');

async function getUserByEmail(email) {
  return models.User.findOne({
    where: { email }
  });
}

const services = { getUserByEmail };

module.exports = services;
