const { Console } = require('../models/console.js')
// GET
const getConsole = async (req, res, next) => {
  try {
    const Consoles = await Console.find().populate('games')
    return res.status(200).json(Consoles)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Console', error])
  }
}
// Get by ID
const getByIdConsole = async (req, res, next) => {
  try {
    const { id } = req.params
    const Consoles = await Console.find({ _id: id }).populate('games')
    return res.status(200).json(Consoles)
  } catch (error) {
    return res.status(400).json(['Error while GETTING a Console', error])
  }
}
// POST
const createConsole = async (req, res, next) => {
  try {
    // Check for duplicates:
    if (await Console.findOne({ name: req.body.name })) {
      return res.status(400).json(['Console Already Exists', req.body])
    }
    const newConsole = new Console(req.body)
    console.log(newConsole)
    const ConsoleSaved = await newConsole.save()
    return res.status(201).json(ConsoleSaved)
  } catch (error) {
    return res.status(400).json(['Error while CREATING a Console', error])
  }
}
// Update
const updateConsole = async (req, res, next) => {
  console.log(req.params)
  try {
    const { id } = req.params

    const newConsole = new Console(req.body)
    newConsole._id = id
    console.log(newConsole)
    const updateConsole = await Console.findByIdAndUpdate(id, newConsole, { new: true })
    return res.status(200).json(updateConsole)
  } catch (error) {
    return res.status(400).json(['Error while UPDATING a Console', error])
  }
}
//Delete
const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params
    const delConsole = await Console.findByIdAndDelete(id)
    return res.status(200).json(delConsole)
  } catch (error) {
    return res.status(400).json(['Error while DELETING a Console', error])
  }
}

module.exports = {
  getConsole,
  getByIdConsole,
  createConsole,
  updateConsole,
  deleteConsole
}
