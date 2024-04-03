//  get the controllers

const { isAuth, isAdmin } = require('../../middleware/auth.js')
const {
  getGame,
  getByIdGame,
  getByCategoryGame,
  createGame,
  updateGame,
  deleteGame
} = require('../controllers/games.js')

const gamesRoutes = require('express').Router()

gamesRoutes.get('/', [isAuth], getGame)
gamesRoutes.get('/:id', [isAuth], getByIdGame)
gamesRoutes.get('/category/:category', getByCategoryGame)
gamesRoutes.post('/', [isAdmin], createGame)
gamesRoutes.put('/:id', [isAdmin], updateGame)
gamesRoutes.delete('/:id', [isAdmin], deleteGame)

module.exports = { gamesRoutes }
