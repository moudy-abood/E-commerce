const { StatusCodes } = require('http-status-codes');
const { addressServices } = require('../services');

async function checkOrderAddress(req, res, next) {
  const { addressUuid, temporaryAddress } = req.body;
  try {
    if (temporaryAddress) {
      return next();
    }
    const address = await addressServices.findAddress(addressUuid);
    req.address = address;
    req.body.addressId = address.id;
    return req.address ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkOrderAddress;
