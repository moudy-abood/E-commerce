const models = require('../models');
const { Op } = require('sequelize');

async function create(cartDetails) {
  return models.Cart.create(cartDetails);
}

async function getUserExposedCart(userId) {
  return models.Cart.findOne({
    where: { userId },
    include: {
      model: models.Item,
      attributes: { exclude: ['id', 'cartId'] },
      include: { model: models.Product, attributes: { exclude: ['id'] } }
    },
    attributes: { exclude: ['id', 'userId'] }
  });
}

async function getCart(id) {
  return models.Cart.findOne({
    where: { userId: id }
  });
}

async function checkAvailableCartMidWare(userId) {
  return models.Cart.findOne({
    where: {
      userId,
      status: {
        [Op.in]: ['NEW', 'INCOMPLETE']
      }
    }
  });
}

async function updateCartStatus(data, uuid) {
  return models.Cart.update(data, { where: { uuid } });
}

const services = {
  create,
  getUserExposedCart,
  updateCartStatus,
  getCart,
  checkAvailableCartMidWare
};

module.exports = services;
