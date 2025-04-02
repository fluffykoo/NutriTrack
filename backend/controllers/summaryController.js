const Meal = require('../models/Meal')
const { getDailyTotals } = require('../utils/nutrition')

const getSummary = async (req, res) => {
const { userId, date } = req.params

try {
    const meals = await Meal.find({ userId, date })
    const totals = getDailyTotals(meals)
    res.json({ date, totals })
} catch (err) {
    res.status(500).json({ error: err.message })
}
}

module.exports = { getSummary }