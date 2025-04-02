// const Meal = require('../models/Meal')
// const Goal = require('../models/Goal')
// const { getDailyTotals } = require('../utils/nutrition')

// const getSummary = async (req, res) => {
// const { userId, date } = req.params

// try {
//     const meals = await Meal.find({ userId, date })
//     const goals = await Goal.findOne({ userId })
//     const totals = getDailyTotals(meals)

//     const diff = {
//     calories: (goals?.calories || 0) - totals.calories,
//     proteines: (goals?.proteines || 0) - totals.proteines,
//     glucides: (goals?.glucides || 0) - totals.glucides,
//     lipides: (goals?.lipides || 0) - totals.lipides
//     }

//     res.json({ date, totals, goals, diff })
// } catch (err) {
//     res.status(500).json({ error: err.message })
// }
// }

// module.exports = { getSummary }
const Meal = require('../models/Meal')
const Goal = require('../models/Goal')
const { getDailyTotals } = require('../utils/nutrition')

const getSummary = async (req, res) => {
const { userId, date } = req.params

try {
    const meals = await Meal.find({ userId, date })
    const goals = await Goal.findOne({ userId })
    const totals = getDailyTotals(meals)

    const diff = {
    calories: (goals?.calories || 0) - totals.calories,
    proteines: (goals?.proteines || 0) - totals.proteines,
    glucides: (goals?.glucides || 0) - totals.glucides,
    lipides: (goals?.lipides || 0) - totals.lipides
    }

/* const messages = {}
    for (const key in diff) {
    if (!goals) {
        messages[key] = "Aucun objectif défini"
    } else if (diff[key] === 0) {
        messages[key] = "Objectif atteint 🎯"
    } else if (diff[key] > 0) {
        messages[key] = `Encore ${diff[key]} ${key} à consommer`
    } else {
        messages[key] = `Trop de ${key} consommé`
    }
    }
    git add .
    git commit -m "Ajout des messages de comparaison entre les totaux et les objectifs dans la route /summary"
    git push origin main
    */

    res.json({ date, totals, goals, diff }) 
} catch (err) {
    res.status(500).json({ error: err.message })
} 
}
module.exports = { getSummary }