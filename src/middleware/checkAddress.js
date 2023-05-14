const { StatusCodes } = require('http-status-codes');
const { addressServices } = require('../services');

async function checkAddress(req, res, next) {
  const { uuid } = req.params;
  try {
    const address = await addressServices.getAddressMidWare(uuid);
    req.address = address;
    return address ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAddress;
