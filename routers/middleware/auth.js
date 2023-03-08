const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error();
    }

    req.token = decoded;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
