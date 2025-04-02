const Goal = require('../models/Goal')

const setGoal = async (req, res) => {
const { userId, calories, proteines, glucides, lipides } = req.body
try {
    await Goal.findOneAndUpdate(
    { userId },
    { calories, proteines, glucides, lipides },
    { upsert: true, new: true }
    )
    res.status(200).json({ message: 'Objectif enregistré' })
} catch (err) {
    res.status(500).json({ error: err.message })
}
}

const getGoal = async (req, res) => {
try {
    const goal = await Goal.findOne({ userId: req.params.userId })
    res.json(goal || {})
} catch (err) {
    res.status(500).json({ error: err.message })
}
}

module.exports = { setGoal, getGoal }