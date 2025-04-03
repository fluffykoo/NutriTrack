// controllers/mealsController.js
const Meal = require("../models/Meal");
const Goal = require("../models/Goal");
const { getDailyTotals } = require("../utils/nutrition");

const getSummary = async (req, res) => {
const { userId, date } = req.params;

try {
    const meals = await Meal.find({ userId, date });
    const goals = await Goal.findOne({ userId });
    const totals = getDailyTotals(meals);

    const diff = {
    calories: (goals?.calories || 0) - totals.calories,
    proteines: (goals?.proteines || 0) - totals.proteines,
    glucides: (goals?.glucides || 0) - totals.glucides,
    lipides: (goals?.lipides || 0) - totals.lipides
    };

    res.json({ date, totals, goals, diff });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

module.exports = { getSummary };