const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Goal = require("../models/Goal");

// Liste tous les utilisateurs → utilisé pour la connexion
router.get("/", async (req, res) => {
    try {
      const users = await User.find(); // renvoie tous les users
    res.json(users);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
try {
    const username = req.body.username;

    // création de l'utilisateur
    const newUser = new User({ username });
    const savedUser = await newUser.save();

    // objectifs par défaut
    const defaultGoals = new Goal({
    userId: username,
    calories: 2000,
    proteines: 100,
    glucides: 250,
    lipides: 70
    });

    await defaultGoals.save();

    res.status(201).json(savedUser);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

module.exports = router;