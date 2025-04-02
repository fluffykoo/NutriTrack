const getDailyTotals = (meals) => {
    const base = { calories: 0, proteines: 0, glucides: 0, lipides: 0 }

    return meals.reduce((totals, meals) => ({
    calories: totals.calories + (meals.calories || 0),
    proteines: totals.proteines + (meals.proteines || 0),
    glucides: totals.glucides + (meals.glucides || 0),
    lipides: totals.lipides + (meals.lipides || 0)
    }), base)
}

module.exports = { getDailyTotals }