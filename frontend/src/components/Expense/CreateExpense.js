import React, { useState } from 'react';
import axios from 'axios';

const CreateExpense = ({ eventId }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/expenses', { eventId, amount, description }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Expense created successfully!');
        } catch (error) {
            console.error('Error creating expense', error);
            alert('Failed to create expense.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default CreateExpense;