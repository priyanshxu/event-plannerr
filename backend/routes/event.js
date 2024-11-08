const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth'); // Middleware to verify JWT

const router = express.Router();

// Event Route
router.post('/', auth, async (req, res) => {
    const { title, description, date } = req.body;

    if (!title || !date) {
        return res.status(400).json({ message: "Title and date are required." });
    }
    console.log("Creating event for user:", req.user.id);
    try {
        const event = new Event({ title, description, date, createdBy: req.user.id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error("Error in event creation:", error);
        res.status(500).send("Error creating event:"+ error.message);
    }
});

// Get Events Route
router.get('/', auth, async (req, res) => {
    try {
        const events = await Event.find({ createdBy: req.user.id });
        res.json(events);
    } catch (error) {
        res.status(500).send("Error fetching events");
    }
});

module.exports = router;