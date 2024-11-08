// routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch all messages (or messages for a specific event)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Save a new message
router.post('/', async (req, res) => {
    const { user, message } = req.body;
    const newMessage = new Message({ user, message });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;