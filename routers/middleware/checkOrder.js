const { StatusCodes } = require('http-status-codes');
const { Order } = require('../../models');

async function checkOrder(req, res, next) {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    return order ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkOrder;
