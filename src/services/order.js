const models = require('../models');

async function create(orderDetails) {
  return models.Order.create(orderDetails);
}

async function findOne(uuid) {
  return models.Order.findOne({
    where: { uuid },
    include: {
      model: models.Cart,
      include: { model: models.Item, include: { model: models.Product } }
    },
    attributes: { exclude: ['id'] },
    nest: true,
    raw: true
  });
}
async function update(status, uuid) {
  return models.Order.update({ status }, { where: { uuid } });
}

async function remove(uuid) {
  return models.Order.destroy({ where: { uuid } });
}

const services = { create, findOne, update, remove };

module.exports = services;
