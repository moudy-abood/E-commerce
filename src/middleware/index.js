const checkProduct = require('./checkProduct');
const auth = require('./auth');
const checkAddress = require('./checkAddress');
const checkItem = require('./checkItem');
const checkAvailableCart = require('./checkAvailableCart');
const checkCart = require('./checkCart');
const checkOrder = require('./checkOrder');
const checkAdmin = require('./checkAdmin');
const checkOrderAddress = require('./checkOrderAddress');
const checkUser = require('./checkUser');
const queryFilters = require('./queryFilters');
const checkEmail = require('./checkEmail');

module.exports = {
  checkProduct,
  auth,
  checkAddress,
  checkItem,
  checkAvailableCart,
  checkCart,
  checkOrder,
  checkAdmin,
  checkOrderAddress,
  checkUser,
  queryFilters,
  checkEmail
};
