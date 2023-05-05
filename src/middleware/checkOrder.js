const { StatusCodes } = require('http-status-codes');
const { Order } = require('../../src/models');

async function checkOrder(req, res, next) {
  const { uuid } = req.params;
  try {
    const order = await Order.findOne({ where: { uuid } });
    return order ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkOrder;
