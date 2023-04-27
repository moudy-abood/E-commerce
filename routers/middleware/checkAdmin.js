const { StatusCodes } = require('http-status-codes');

async function checkAdmin(req, res, next) {
  const { role } = req.user;
  try {
    return role === 'ADMIN' ? next() : res.status(StatusCodes.UNAUTHORIZED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAdmin;
