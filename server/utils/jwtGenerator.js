const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

function jwtGenerator(id) {
  const payload = {
    user: id
  }
  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 3600})
}

module.exports = jwtGenerator;