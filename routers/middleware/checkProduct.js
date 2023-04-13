const { StatusCodes } = require('http-status-codes');
const { Product } = require('../../models');

async function checkProduct(req, res, next) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id } });
    req.product = product;
    return product ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkProduct;
