const { StatusCodes } = require('http-status-codes');
const { authenticationServices } = require('../services');

async function checkUser(req, res, next) {
  const { email } = req.body;
  try {
    const user = await authenticationServices.getUserByEmail(email);
    req.user = user;
    return user
      ? next()
      : res.status(StatusCodes.UNAUTHORIZED).send(' wrong password or/and email');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkUser;
