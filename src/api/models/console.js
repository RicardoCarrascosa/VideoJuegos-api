const mongoose = require('mongoose')

const consoleSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: 'games', required: false }]
  },
  {
    timestamp: true,
    collecton: 'consoles'
  }
)

const Console = mongoose.model('consoles', consoleSchema, 'consoles')

module.exports = { Console }
