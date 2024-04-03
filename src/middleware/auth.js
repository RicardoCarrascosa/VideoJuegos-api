//Authentication
const { User } = require('../api/models/users.js')
const { verifyJwt } = require('../config/jwt.js')

const isAuth = async (req, res, next) => {
  try {
    // the Authoritation is in the header of the request - Normally has in front Bearer
    const token = req.headers.authorization
    // If the token does not exists
    if (!token) {
      return res.status(400).json('Not Authorized')
    }
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)
    // DELETE the password before sent to the FRONT
    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json(['Error in Authorization', error])
  }
}

const isAdmin = async (req, res, next) => {
  try {
    // the Authoritation is in the header of the request - Normally has in front Bearer
    const token = req.headers.authorization
    // If the token does not exists
    if (!token) {
      return res.status(400).json('Not Authorized')
    }

    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJwt(parsedToken)
    const user = await User.findById(id)
    // Check for the role of the user
    if (user.rol === 'admin') {
      // DELETE the password before sent to the FRONT
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('Do not have permisions')
    }
  } catch (error) {
    return res.status(400).json(['Error in Authorization', error])
  }
}

module.exports = { isAdmin, isAuth }
