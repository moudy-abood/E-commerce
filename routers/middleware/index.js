const checkProduct = require('./checkProduct');
const auth = require('./auth');
const checkAddress = require('./checkAddress');
const checkItem = require('./checkItem');
const checkAvailableCart = require('./checkAvailableCart');
const checkCart = require('./checkCart');
const checkOrder = require('./checkOrder');
const checkAdmin = require('./checkAdmin');

module.exports = {
  checkProduct,
  auth,
  checkAddress,
  checkItem,
  checkAvailableCart,
  checkCart,
  checkOrder,
  checkAdmin
};
