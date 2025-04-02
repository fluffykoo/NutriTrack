const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
userId: String,
nom: String,
calories: Number,
proteines: Number,
glucides: Number,
lipides: Number,
date: String
})

module.exports = mongoose.model('Meal', mealSchema)