//  get the controllers

const { isAuth, isAdmin } = require('../../middleware/auth.js')
const {
  getUsers,
  registerUser,
  logingUser,
  getUsersByID,
  updateUser,
  deleteUser
} = require('../controllers/users.js')

const usersRoutes = require('express').Router()

usersRoutes.get('/', [isAdmin], getUsers) //User
usersRoutes.post('/register', registerUser)
usersRoutes.post('/login', logingUser)
usersRoutes.get('/:id', [isAdmin], getUsersByID) //Admin
usersRoutes.put('/:id', [isAdmin], updateUser) //Admin
usersRoutes.delete('/:id', [isAdmin], deleteUser) //Admin

module.exports = { usersRoutes }
