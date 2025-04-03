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
const getAverageMacros = async (req, res) => {
    const { userId } = req.params;

    try {
    const meals = await Meal.find({ userId });

    if (!meals.length) return res.json({ days: 0, average: {} });

    const groupedByDay = R.groupBy(meal => meal.date, meals);

    const dailyTotals = R.map(
        dayMeals => R.reduce(
        (totals, meal) => ({
            calories: totals.calories + meal.calories,
            proteines: totals.proteines + meal.proteines,
            glucides: totals.glucides + meal.glucides,
            lipides: totals.lipides + meal.lipides
        }),
        { calories: 0, proteines: 0, glucides: 0, lipides: 0 },
        dayMeals
        ),
        groupedByDay
    );

    const daysCount = R.length(R.keys(dailyTotals));
    const sumTotals = R.reduce(
        (acc, daily) => ({
        calories: acc.calories + daily.calories,
        proteines: acc.proteines + daily.proteines,
        glucides: acc.glucides + daily.glucides,
        lipides: acc.lipides + daily.lipides
        }),
        { calories: 0, proteines: 0, glucides: 0, lipides: 0 },
        R.values(dailyTotals)
    );

    const average = R.map(val => Math.round(val / daysCount), sumTotals);

    res.json({ days: daysCount, average });
    } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

module.exports = { addMeal, getMealsByUser, getMealsByUserAndDate, getAverageMacros };