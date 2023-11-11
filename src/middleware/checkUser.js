const { StatusCodes } = require('http-status-codes');
const { authenticationServices } = require('../services');

async function checkUser(req, res, next) {
  const { email } = req.body;
  try {
    const user = await authenticationServices.getEmail(email);
    req.user = user;
    return user
      ? next()
      : res.status(StatusCodes.NOT_FOUND).send(' wrong password or/and username');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkUser;
