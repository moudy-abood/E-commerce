const { StatusCodes } = require('http-status-codes');
const models = require('../../models');

async function createAddress(req, res) {
  const { id } = req.user;
  try {
    await models.Address.create({ ...req.body, userId: id });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findAllAddresses(req, res) {
  const { id } = req.user;
  try {
    const addresses = await models.Address.findAll({ where: { userId: id } });
    return res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findAddress(req, res) {
  const { uuid } = req.params;
  try {
    const address = await models.Address.findOne({ where: { uuid } });
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
    await models.Address.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteAddress(req, res) {
  const { uuid } = req.params;
  try {
    await models.Address.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = { createAddress, findAllAddresses, findAddress, updateAddress, deleteAddress };
