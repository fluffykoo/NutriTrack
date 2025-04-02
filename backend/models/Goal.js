const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
userId: String,
calories: Number,
proteines: Number,
glucides: Number,
lipides: Number
})

module.exports = mongoose.model('Goal', goalSchema)