const { User } = require('../models/users.js')
const bcrypt = require('bcrypt')
const { generateSign } = require('../../config/jwt.js')
// GETALL
const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find()
    return res.status(200).json(Users)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a User', error])
  }
}
// Get by ID
const getUsersByID = async (req, res, next) => {
  try {
    const { id } = req.params
    const Users = await User.find({ _id: id })
    return res.status(200).json(Users)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a User', error])
  }
}

// POST
const registerUser = async (req, res, next) => {
  try {
    // Check for duplicates:
    if (await User.findOne({ userName: req.body.userName })) {
      return res.status(400).json(['User Already Exists', req.body])
    }
    const newUser = new User(req.body)
    newUser.rol = 'user'
    const UserSaved = await newUser.save()
    return res.status(201).json(UserSaved)
  } catch (error) {
    return res.status(400).json(['Error while CREATING a User', error])
  }
}

const logingUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    // Si no exsiste Usuario
    if (!user) {
      return res.status(400).json('User os Password is Incorrect')
    }
    // Checkeo la contraseña
    if (bcrypt.compareSync(req.body.password, user.password)) {
      // Genero un TOKEN de que el usuario esta logeado
      const token = generateSign(user._id)
      // return the user and its token
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('User os Password is Incorrect')
    }
  } catch (error) {
    return res.status(400).json(['Error while CREATING a User', error])
  }
}
// Update
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const newUser = new User(req.body)
    newUser._id = id
    const updateUser = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(updateUser)
  } catch (error) {
    return res.status(400).json(['Error while UPDATING a User', error])
  }
}
//Delete
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const delUser = await User.findByIdAndDelete(id)
    return res.status(200).json(delUser)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a User', error])
  }
}

module.exports = {
  getUsers,
  registerUser,
  logingUser,
  getUsersByID,
  updateUser,
  deleteUser
}
