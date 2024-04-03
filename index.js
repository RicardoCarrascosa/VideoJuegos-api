// Variables de estado
require('dotenv').config()

// Cargo la libreria
const express = require('express')
const { connectDB } = require('./src/config/db.js')
const { gamesRoutes } = require('./src/api/routes/games.js')
const { consolesRoutes } = require('./src/api/routes/console.js')
const { usersRoutes } = require('./src/api/routes/users.js')

// Start the server
const app = express()
app.use(express.json())
connectDB()
// Vinculo las rutas
app.use('/api/v1/games', gamesRoutes)
app.use('/api/v1/consoles', consolesRoutes)
app.use('/api/v1/users', usersRoutes)

// Pongo el servidor a escuchar
app.listen(3000, () => {
  console.log('Servidor conectado en http://localhost:3000')
})
