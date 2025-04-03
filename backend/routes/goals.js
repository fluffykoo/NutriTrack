const express = require("express");
const router = express.Router();
const { setGoal, getGoal, updateGoal } = require("../controllers/goalsController");

router.post("/", setGoal);
router.get("/:userId", getGoal);
router.put("/:userId", updateGoal);

module.exports = router;