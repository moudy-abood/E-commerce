const { StatusCodes } = require('http-status-codes');
const { orderServices } = require('../services');

async function checkOrder(req, res, next) {
  const { uuid } = req.params;
  try {
    const order = await orderServices.findOneMidWare(uuid);
    return order ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkOrder;
