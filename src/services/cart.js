const models = require('../models');
const { Op } = require('sequelize');

async function create(cartDetails) {
  return models.Cart.create(cartDetails);
}

async function getOne(cartUuid) {
  return models.Cart.findOne({
    where: { uuid: cartUuid },
    include: {
      model: models.Item,
      attributes: { exclude: ['id', 'cartId', 'productId'] },
      include: { model: models.Product, attributes: { exclude: ['id'] } }
    },
    attributes: { exclude: ['id', 'userId'] }
  });
}

async function findOneMidWare(uuid) {
  return models.Cart.findOne({
    where: { uuid }
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

const services = { create, getOne, updateCartStatus, findOneMidWare, checkAvailableCartMidWare };

module.exports = services;
