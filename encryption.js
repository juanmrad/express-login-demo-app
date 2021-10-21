var bcrypt = require('bcryptjs');
var salt = "$2a$10$K32g1TfBg3BwjuyNBYeIF.";

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, salt);
}

module.exports = encryptPassword
