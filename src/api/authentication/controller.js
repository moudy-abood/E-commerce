const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const tokenGen = require('../../utils/token');

async function login(req, res) {
  try {
    const { password } = req.body;
    const { id } = req.user;
    const UserPassword = req.user.password;
    const isPasswordMatched = await bcrypt.compare(password, UserPassword);
    const token = tokenGen({ userId: id });
    return isPasswordMatched
      ? res.status(StatusCodes.OK).send({ token })
      : res.status(StatusCodes.UNAUTHORIZED).send(' wrong password or/and email');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { login };

module.exports = controller;
