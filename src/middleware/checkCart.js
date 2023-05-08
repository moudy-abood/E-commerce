const { StatusCodes } = require('http-status-codes');
const { cartServices } = require('../services');

async function checkCart(req, res, next) {
  const uuid = req.body.cartUuid || req.params.cartUuid;
  try {
    const cart = await cartServices.findOneMidWare(uuid);
    req.cart = cart;
    return cart ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkCart;
