const { StatusCodes } = require('http-status-codes');
const { orderServices } = require('../services');

async function getAddressId(req, res, next) {
  const { addressUuid } = req.body;
  try {
    const address = await orderServices.findAddressMidWare(addressUuid);
    req.addressId = address.id;
    return req.addressId ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = getAddressId;
