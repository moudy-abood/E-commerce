const { StatusCodes } = require('http-status-codes');
const { addressServices } = require('../../services');

async function createAddress(req, res) {
  const { id } = req.user;
  try {
    await addressServices.create({ ...req.body, userId: id });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function listUserAddresses(req, res) {
  const { id } = req.user;
  try {
    const addresses = await addressServices.findAll({
      where: { userId: id },
      attributes: { exclude: ['id'] }
    });
    return res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUserAddress(req, res) {
  const { uuid } = req.params;
  try {
    const address = await addressServices.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] }
    });
    return res.status(StatusCodes.OK).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateAddress(req, res) {
  const { uuid } = req.params;
  const data = req.body;
  try {
    await addressServices.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteAddress(req, res) {
  const { uuid } = req.params;
  try {
    await addressServices.remove({ where: { uuid } });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createAddress,
  listUserAddresses,
  getUserAddress,
  updateAddress,
  deleteAddress
};
module.exports = controller;
