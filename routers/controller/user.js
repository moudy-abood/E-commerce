const { StatusCodes } = require('http-status-codes');
const models = require('../../models');
const tokenGen = require('../../utils/token');

async function createUser(req, res) {
  try {
    const user = await models.User.create({ ...req.body });
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
    await models.User.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findUser(req, res) {
  const { uuid } = req.user;
  try {
    const user = await models.User.findOne({ where: { uuid } });
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteUser(req, res) {
  const { uuid } = req.params;
  try {
    await models.User.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = { createUser, UpdateUser, findUser, deleteUser };
