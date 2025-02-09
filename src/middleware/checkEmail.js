const { StatusCodes } = require('http-status-codes');
const { userServices } = require('../services');

async function checkEmail(req, res, next) {
  const { email } = req.body;
  try {
    const emailCheck = await userServices.findEmail(email);

    if (req.user) {
      if (emailCheck && emailCheck.id === req.user.id) {
        return next();
      }
    }
    return emailCheck ? res.status(StatusCodes.CONFLICT).send('already in use') : next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkEmail;
