const { StatusCodes } = require('http-status-codes');
const { addressServices } = require('../services');

async function getAddress(req, res, next) {
  const { addressUuid } = req.body;
  try {
    const address = await addressServices.findAddress(addressUuid);
    req.addressId = address.id;
    return req.addressId ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = getAddress;
