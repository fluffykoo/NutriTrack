// index.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/meals', require('./routes/meals'))
app.use('/goals', require('./routes/goals'))
app.use('/users', require('./routes/users'))

app.get('/', (req, res) => {
res.send('Serveur NutriTrack actif !')
})

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Connecté à MongoDB')
    app.listen(3000, () => {
    console.log('🚀 Serveur lancé : http://localhost:3000')
    })
})
.catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message)
})