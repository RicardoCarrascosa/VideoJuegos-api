// const mongoose = require('mongoose')

const { Game } = require('../models/games.js')
// GET
const getGame = async (req, res, next) => {
  try {
    const games = await Game.find()
    return res.status(200).json(games)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Game', error])
  }
}
// Get by ID
const getByIdGame = async (req, res, next) => {
  try {
    const { id } = req.params
    const games = await Game.find({ _id: id })
    return res.status(200).json(games)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Game', error])
  }
}
// Get By Category
const getByCategoryGame = async (req, res, next) => {
  try {
    const { category } = req.params
    const games = await Game.find({ category: category })
    return res.status(200).json(games)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Game', error])
  }
}
// POST
const createGame = async (req, res, next) => {
  try {
    // Check for duplicates:
    if (await Game.findOne({ name: req.body.name })) {
      return res.status(400).json(['Game Already Exists', req.body])
    }
    const newGame = new Game({
      name: req.body.name,
      img: req.body.img,
      category: req.body.category,
      pegi: req.body.pegi
    })
    const gameSaved = await newGame.save()

    return res.status(201).json(gameSaved)
  } catch (error) {
    return res.status(400).json(['Error while CREATING a Game', error])
  }
}

// Update
const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params
    const newGame = new Game(req.body)
    newGame._id = id
    const updateGame = await Game.findByIdAndUpdate(id, newGame, { new: true })
    return res.status(200).json(updateGame)
  } catch (error) {
    return res.status(400).json(['Error while UPDATING a Game', error])
  }
}

//Delete
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params
    const delGame = await Game.findByIdAndDelete(id)
    return res.status(200).json(delGame)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a Game', error])
  }
}

module.exports = { getGame, getByIdGame, getByCategoryGame, createGame, updateGame, deleteGame }
