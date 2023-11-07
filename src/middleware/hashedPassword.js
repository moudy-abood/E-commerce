const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashedPassword(req, res, next) {
  try {
    const { password } = req.body;
    if (!password) throw new Error('no password given');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = hashedPassword;
