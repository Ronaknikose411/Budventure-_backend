const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // admin stays logged in for 1 days
  });
};

module.exports = generateToken;
