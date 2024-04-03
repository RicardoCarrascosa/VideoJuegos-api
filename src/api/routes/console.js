//  get the controllers

const { isAdmin } = require('../../middleware/auth.js')
const {
  getConsole,
  getByIdConsole,
  createConsole,
  updateConsole,
  deleteConsole
} = require('../controllers/console.js')

const consolesRoutes = require('express').Router()

consolesRoutes.get('/', getConsole)
consolesRoutes.get('/:id', getByIdConsole)
consolesRoutes.post('/', [isAdmin], createConsole)
consolesRoutes.put('/:id', [isAdmin], updateConsole)
consolesRoutes.delete('/:id', [isAdmin], deleteConsole)

module.exports = { consolesRoutes }
