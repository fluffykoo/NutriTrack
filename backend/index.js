// index.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

//ajout de la route pour les meals
const mealsRoutes = require('./routes/meals')
app.use('/meals', mealsRoutes)

//ajout de la route pour les goals
const goalsRoutes = require('./routes/goals')
app.use('/goals', goalsRoutes)


app.get('/', (req, res) => {
res.send('✅ Serveur NutriTrack actif !')
})

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Connecté à MongoDB') //log de connexion 
    app.listen(3000, () => {
    console.log('🚀 Serveur lancé sur http://localhost:3000')
    })
})
.catch((err) => {
    console.error('❌ Erreur de connexion MongoDB :', err)
})