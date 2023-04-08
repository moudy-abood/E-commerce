const { StatusCodes } = require('http-status-codes');
const { Address } = require('../../models');

async function checkAddress(req, res, next) {
  const { id } = req.params;
  try {
    const address = await Address.findOne({ where: { id } });
    req.address = address;
    return address ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAddress;
