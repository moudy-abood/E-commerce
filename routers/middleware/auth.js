const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error('Token expired or something');
    }

    req.token = decoded;
    req.user = user;
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).send();
  }
};

module.exports = auth;
