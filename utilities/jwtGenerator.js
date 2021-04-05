const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id, family_id) {
  const payload = {
    user: user_id,
    family: family_id
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '8hr' });
}

module.exports = jwtGenerator;