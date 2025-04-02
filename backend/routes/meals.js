const express = require('express')
const router = express.Router()
const { addMeal, getMealsByUser } = require('../controllers/mealsController')
const { getSummary } = require('../controllers/summaryController')
const { getMealsByUserAndDate } = require('../controllers/mealsController')

router.post('/', addMeal)
router.get('/:userId', getMealsByUser)
router.get('/summary/:userId/:date', getSummary)
router.get("/:userId/:date", getMealsByUserAndDate);
module.exports = router