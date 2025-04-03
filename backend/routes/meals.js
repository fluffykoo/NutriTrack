const express = require('express');
const router = express.Router();
const {
addMeal,
getMealsByUser,
getMealsByUserAndDate,
getWeeklyStats,
getTopMeals
} = require('../controllers/mealsController');
const { getSummary } = require('../controllers/summaryController');

router.post('/', addMeal);
router.get('/summary/:userId/:date', getSummary);
router.get('/weekly/:userId', getWeeklyStats);
router.get("/top/:userId", getTopMeals);
router.get('/:userId/:date', getMealsByUserAndDate);
router.get('/:userId', getMealsByUser); 

module.exports = router;