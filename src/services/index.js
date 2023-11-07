const addressServices = require('./address');
const productServices = require('./products');
const userServices = require('./user');
const authenticationServices = require('./authentication');
const cartServices = require('./cart');
const itemServices = require('./item');
const orderServices = require('./order');

module.exports = {
  addressServices,
  productServices,
  userServices,
  cartServices,
  itemServices,
  orderServices,
  authenticationServices
};
