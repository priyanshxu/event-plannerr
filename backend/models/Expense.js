const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', ExpenseSchema);