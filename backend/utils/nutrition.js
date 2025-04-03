const R = require("ramda");

const getDailyTotals = (meals) =>
R.reduce(
    (acc, m) => ({
    calories: acc.calories + m.calories,
    proteines: acc.proteines + m.proteines,
    glucides: acc.glucides + m.glucides,
    lipides: acc.lipides + m.lipides
    }),
    { calories: 0, proteines: 0, glucides: 0, lipides: 0 },
    meals
);

module.exports = { getDailyTotals };