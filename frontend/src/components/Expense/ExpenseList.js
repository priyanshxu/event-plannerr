import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ eventId }) => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5000/api/expenses/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [eventId]);

    return (
        <div>
            <h3>Expenses</h3>
            {expenses.length === 0 ? (
                <p>No expenses found for this event.</p>
            ) : (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            <p>Amount: ${expense.amount}</p>
                            <p>Description: {expense.description}</p>
                            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpenseList;