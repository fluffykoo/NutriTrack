const express = require('express')
const router = express.Router()
const { addMeal, getMealsByUser } = require('../controllers/mealsController')
const { getSummary } = require('../controllers/summaryController')

router.post('/', addMeal)
router.get('/:userId', getMealsByUser)
router.get('/summary/:userId/:date', getSummary)

module.exports = router