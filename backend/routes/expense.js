const express = require('express');
const Expense = require('../models/Expense');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Expense Route
router.post('/', auth, async (req, res) => {
    const { eventId, amount, description } = req.body;
    const expense = new Expense({ eventId, amount, description });

    try {
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).send("Error creating expense");
    }
});

// Get Expenses Route
router.get('/:eventId', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ eventId: req.params.eventId });
        res.json(expenses);
    } catch (error) {
        res.status(500).send("Error fetching expenses");
    }
});

module.exports = router;