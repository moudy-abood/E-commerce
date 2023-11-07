const { StatusCodes } = require('http-status-codes');
const { userServices } = require('../../services');

async function updateUser(req, res) {
  const data = req.body;
  const { uuid } = req.user;
  try {
    await userServices.update(data, uuid);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUser(req, res) {
  const { uuid } = req.user;
  try {
    const user = await userServices.getOne(uuid);
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteUser(req, res) {
  const { uuid } = req.params;
  try {
    await userServices.removeUser(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { updateUser, getUser, deleteUser };

module.exports = controller;
