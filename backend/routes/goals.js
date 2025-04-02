const express = require('express')
const router = express.Router()
const { setGoal, getGoal } = require('../controllers/goalsController')

router.post('/', setGoal)
router.get('/:userId', getGoal)

module.exports = router