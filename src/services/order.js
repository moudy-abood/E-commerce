const models = require('../models');

async function create(orderDetails) {
  return models.Order.create(orderDetails);
}

async function findOne(uuid) {
  return models.Order.findOne({
    where: { uuid },
    include: [
      {
        model: models.Cart,
        include: {
          model: models.Item,
          attributes: { exclude: ['id', 'cartId', 'productId'] },
          include: { model: models.Product, attributes: { exclude: ['id'] } }
        }
      },
      {
        model: models.Address,
        attributes: { exclude: ['id', 'userId'] }
      }
    ],
    attributes: { exclude: ['id', 'cartId', 'addressId'] }
  });
}

async function findAll(id) {
  return models.Order.findAll({
    where: { userId: id },
    include: [
      {
        model: models.Cart,
        include: {
          model: models.Item,
          attributes: { exclude: ['id', 'cartId', 'productId'] },
          include: { model: models.Product, attributes: { exclude: ['id'] } }
        }
      },
      {
        model: models.Address,
        attributes: { exclude: ['id', 'userId'] }
      }
    ]
  });
}

async function update(status, uuid) {
  return models.Order.update({ status }, { where: { uuid } });
}

async function removeOrder(uuid) {
  return models.Order.destroy({ where: { uuid } });
}

async function findOneMidWare(uuid) {
  return models.Order.findOne({ where: { uuid } });
}

async function findAddressMidWare(uuid) {
  return models.Address.findOne({
    where: { uuid }
  });
}

const services = {
  create,
  findOne,
  update,
  removeOrder,
  findOneMidWare,
  findAddressMidWare,
  findAll
};

module.exports = services;
