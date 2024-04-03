const mongoose = require('mongoose')

const gameSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Arcade', 'Adventure', 'Action', 'Rol', 'Shooter', 'Strategy', 'Sports', 'Simulation']
    },
    pegi: {
      type: String,
      enum: ['PEGI3', 'PEGI7', 'PEGI12', 'PEGI16', 'PEGI18']
    }
  },
  {
    timestamps: true,
    collecton: 'games'
  }
)

const Game = mongoose.model('games', gameSchema, 'games')

module.exports = { Game }
