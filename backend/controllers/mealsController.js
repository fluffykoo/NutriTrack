const Meal = require('../models/Meal')

const addMeal = async (req, res) => {
try {
    const meal = new Meal(req.body)
    await meal.save()
    res.status(201).json({ message: 'Repas enregistré' })
} catch (err) {
    res.status(500).json({ error: err.message })
}
}

const getMealsByUser = async (req, res) => {
try {
    const meals = await Meal.find({ userId: req.params.userId })
    res.json(meals)
} catch (err) {
    res.status(500).json({ error: err.message })
}
}
const getMealsByUserAndDate = async (req, res) => {
    const { userId, date } = req.params;
    const meals = await Meal.find({ userId, date });
    res.json(meals);
};
module.exports = { addMeal, getMealsByUser, getMealsByUserAndDate }