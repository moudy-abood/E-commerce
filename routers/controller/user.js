const { StatusCodes } = require('http-status-codes');
const { userServices } = require('../../services');
const tokenGen = require('../../utils/token');

async function createUser(req, res) {
  try {
    const user = await userServices.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function UpdateUser(req, res) {
  const data = req.body;
  const { uuid } = req.user;
  try {
    await userServices.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUser(req, res) {
  const { uuid } = req.user;
  try {
    const user = await userServices.findOne({
      where: { uuid },
      attributes: { exclude: ['id'] }
    });
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteUser(req, res) {
  const { uuid } = req.params;
  try {
    await userServices.remove({ where: { uuid } });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createUser, UpdateUser, getUser, deleteUser };

module.exports = controller;
