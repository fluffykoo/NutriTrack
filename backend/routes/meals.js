const express = require('express')
const router = express.Router()
const { addMeal, getMealsByUser } = require('../controllers/mealsController')

router.post('/', addMeal)
router.get('/:userId', getMealsByUser)

module.exports = router