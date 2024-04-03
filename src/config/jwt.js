//JSONWEBTOKEN
const jwt = require('jsonwebtoken')
// Creates a KEY to enter
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8w' })
}
// Checks the key
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { generateSign, verifyJwt }
