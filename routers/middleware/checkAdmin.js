const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');

async function checkAdmin(req, res, next) {
  const { role } = req.user;
  try {
    const user = await User.findOne({ where: { role } });
    return user.role === 'ADMIN' ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkAdmin;
