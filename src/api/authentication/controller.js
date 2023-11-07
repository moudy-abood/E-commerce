const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const { authenticationServices } = require('../../services');
const tokenGen = require('../../utils/token');

async function createUser(req, res) {
  try {
    const user = await authenticationServices.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function login(req, res) {
  try {
    const { password, email } = req.body;
    if (!password || !email) throw new Error(' Invalid password');

    const user = await authenticationServices.getEmail(email);

    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = tokenGen({ userId: user.id });
      return res.status(StatusCodes.OK).send({ token });
    }
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createUser, login };

module.exports = controller;
