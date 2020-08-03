const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { secret, token_secret } = require("../config");

exports.generateToken = function (payload) {
  // this function is responsible for creating access token when login
  return jwt.sign(payload, token_secret);
};
exports.decodeToken = function (token) {
  // this function is responsible for validating access token when accessing private resources
};
exports.createHash = function (item) {
  return crypto.createHmac("sha256", secret).update(item).digest("hex");
  // this function is responsible for creating hashes
};
// exports.compareHash = function (item1, item2) {
//   return item1 === hash(item2);
//   // this function is responsible for comparing hashes
// };
