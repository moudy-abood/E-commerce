const { StatusCodes } = require('http-status-codes');
const { Cart } = require('../../src/models');
const { Op } = require('sequelize');

async function checkAvailableCart(req, res, next) {
  const { id: userId } = req.user;
  try {
    const cart = await Cart.findOne({
      where: {
        userId,
        status: {
          [Op.in]: ['NEW', 'INCOMPLETE']
        }
      }
    });
    return !cart ? next() : res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAvailableCart;
