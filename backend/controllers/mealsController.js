const Meal = require("../models/Meal");
const _ = require("lodash");

const addMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json({ message: "Repas enregistré" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMealsByUser = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getMealsByUserAndDate = async (req, res) => {
  const { userId, date } = req.params;
  const meals = await Meal.find({ userId, date });
  res.json(meals);
};

const getWeeklyStats = async (req, res) => {
  const { userId } = req.params;

  const today = new Date();
  const fromDateStr = new Date(today.setDate(today.getDate() - 6))
    .toISOString()
    .split("T")[0];

  try {
    const meals = await Meal.find({ userId });

    const filteredMeals = meals.filter((m) => m.date >= fromDateStr);

    const grouped = _.groupBy(filteredMeals, "date");

    const stats = _.chain(grouped)
      .map((entries, date) => ({
        date,
        calories: _.sumBy(entries, "calories"),
        proteines: _.sumBy(entries, "proteines"),
        glucides: _.sumBy(entries, "glucides"),
        lipides: _.sumBy(entries, "lipides"),
      }))
      .sortBy("date")
      .value();

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getTopMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    const top3 = _.orderBy(meals, ["calories"], ["desc"]).slice(0, 3);
    res.json(top3);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAverageStats = async (req, res) => {
  const { userId } = req.params;

  try {
    const meals = await Meal.find({ userId });

    const grouped = R.groupBy(m => m.date, meals);

    const dailyTotals = R.map(R.reduce((acc, m) => ({
      calories: acc.calories + m.calories,
      proteines: acc.proteines + m.proteines,
      glucides: acc.glucides + m.glucides,
      lipides: acc.lipides + m.lipides
    }), { calories: 0, proteines: 0, glucides: 0, lipides: 0 }), R.values(grouped));

    const mean = arr => arr.length ? R.mean(arr) : 0;

    const moyenne = {
      calories: Math.round(mean(R.pluck("calories", dailyTotals))),
      proteines: Math.round(mean(R.pluck("proteines", dailyTotals))),
      glucides: Math.round(mean(R.pluck("glucides", dailyTotals))),
      lipides: Math.round(mean(R.pluck("lipides", dailyTotals)))
    };

    res.json({ jours: dailyTotals.length, moyenne });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addMeal,
  getMealsByUser,
  getMealsByUserAndDate,
  getWeeklyStats,
  getTopMeals,
  getAverageStats,
};
