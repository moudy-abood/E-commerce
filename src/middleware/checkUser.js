const { StatusCodes } = require('http-status-codes');

/* this middleware is made to check that its the right user who used the uuid, makes it unavailable to continue
if its the another user if they even have the correct uuid */

async function checkUser(req, res, next) {
  const { id } = req.user;
  const { userId } = req.address || req.cart || req.order;
  try {
    return userId === id ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkUser;
