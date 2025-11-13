//IMPORTS
require('dotenv').config()
const express = require('express')
const app = express()

// MIDDLEWARES
app.use(express.json())

// ROUTES
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// PRIVATE ROUTES
app.get('/', (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à nossa API!" })
})

module.exports = app
