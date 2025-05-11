const models = require('../models');

//when it comes to creating an order, it should have a hard copy of its items and addresses,
//so when it comes to get the orders history, you get the old values even if they are deleted or updated

async function create(orderDetails) {
  return models.Order.create(orderDetails);
}

async function findExposedOrder(uuid) {
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
        paranoid: false,
        attributes: { exclude: ['id', 'userId'] }
      }
    ],
    attributes: { exclude: ['id', 'cartId', 'addressId', 'userId'] }
  });
}

async function findUserExposedOrders(id) {
  return models.Order.findAll({
    where: { userId: id },
    order: [['createdAt', 'DESC']],
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
        paranoid: false,
        attributes: { exclude: ['id', 'userId'] }
      }
    ],
    attributes: { exclude: ['id', 'userId', 'cartId', 'addressId'] }
  });
}

async function findUsersExposedOrders() {
  return models.Order.findAll({
    include: [
      {
        model: models.Cart,
        attributes: { exclude: ['userId'] },
        include: {
          model: models.Item,
          attributes: { exclude: ['id', 'cartId', 'productId'] },
          include: { model: models.Product, attributes: { exclude: ['id'] } }
        }
      },
      {
        model: models.Address,
        paranoid: false,
        attributes: { exclude: ['id', 'userId'] }
      }
    ],
    attributes: { exclude: ['id', 'userId', 'cartId', 'addressId'] }
  });
}

async function update(status, uuid) {
  return models.Order.update({ status }, { where: { uuid } });
}

async function removeOrder(uuid) {
  return models.Order.destroy({ where: { uuid } });
}

async function findOrder(uuid) {
  return models.Order.findOne({ where: { uuid } });
}

const services = {
  create,
  findExposedOrder,
  update,
  removeOrder,
  findOrder,
  findUserExposedOrders,
  findUsersExposedOrders
};

module.exports = services;
