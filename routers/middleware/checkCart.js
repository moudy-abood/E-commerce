const { StatusCodes } = require('http-status-codes');
const { Cart } = require('../../models');

async function checkCart(req, res, next) {
  const cartUuid = req.body.cartUuid || req.params.cartUuid;
  try {
    const cart = await Cart.findOne({ where: { uuid: cartUuid } });
    req.cart = cart;
    return cart ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkCart;
