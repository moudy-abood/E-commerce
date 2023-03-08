const jwt = require('jsonwebtoken');

function token(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
}

module.exports = token;
