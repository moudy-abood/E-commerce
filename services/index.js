const address = require('./address');
const product = require('./products');
const user = require('./user');
const cart = require('./cart');
const item = require('./item');
const order = require('./order');

const userServices = {
  create: user.create,
  findOne: user.findOne,
  update: user.update,
  remove: user.remove
};

const addressServices = {
  create: address.create,
  findAll: address.findAll,
  findOne: address.findOne,
  update: address.update,
  remove: address.remove
};

const productServices = {
  bulkCreate: product.bulkCreate,
  findAll: product.findAll,
  findOne: product.findOne,
  update: product.update,
  remove: product.remove
};

const cartServices = {
  create: cart.create,
  findOne: cart.findOne,
  update: cart.update
};

const itemServices = {
  create: item.bulkCreate,
  update: item.update,
  remove: item.remove
};

const orderServices = {
  create: order.create,
  findOne: order.findOne,
  update: order.update,
  remove: order.remove
};

module.exports = {
  addressServices,
  productServices,
  userServices,
  cartServices,
  itemServices,
  orderServices
};
