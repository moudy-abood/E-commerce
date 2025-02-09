const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const { userServices } = require('../../services');
const tokenGen = require('../../utils/token');

const saltRounds = Number(process.env.SALT_ROUNDS);

async function createUser(req, res) {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const user = await userServices.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateUser(req, res) {
  const { uuid } = req.user;

  try {
    await userServices.update({ ...req.body }, uuid);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateUserCredentials(req, res) {
  const { newPassword, oldPassword } = req.body;
  const { uuid, password } = req.user;
  const isPasswordMatched = await bcrypt.compare(oldPassword, password);
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  req.body.password = hashedPassword;
  try {
    if (isPasswordMatched) {
      await userServices.update({ ...req.body }, uuid);
      return res.status(StatusCodes.NO_CONTENT).send();
    }
    return res.status(StatusCodes.UNAUTHORIZED).send(' wrong password');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getUser(req, res) {
  const { uuid } = req.user;
  try {
    const user = await userServices.findExposedUser(uuid);
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

const controller = { createUser, updateUser, updateUserCredentials, getUser, deleteUser };

module.exports = controller;
