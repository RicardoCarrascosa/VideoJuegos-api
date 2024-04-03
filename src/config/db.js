//Cargo Mongoose
const mongoose = require('mongoose')

// Es asincrono al tener que esperar al servidor
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('BBDD conectada')
  } catch (error) {
    // Si falla
    console.log('La conexion con la BBDD ha ido Mal!')
  }
}
module.exports = { connectDB }
