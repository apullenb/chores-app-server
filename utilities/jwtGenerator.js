const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id, family_id) {
  const payload = {
    user: user_id,
    family: family_id
  };
console.log(user_id, payload)
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '8hr' });
}

module.exports = jwtGenerator;