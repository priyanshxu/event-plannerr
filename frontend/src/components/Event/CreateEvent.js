import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const CreateEvent = ({ onEventCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        if (!title || !date) {
            setError("Title and date are required fields.");
            return;
        }
    
        console.log('Data being sent:', { title, description, date });  // Log data before sending
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                return;
            }
    
            const response = await axios.post(
                'http://localhost:5000/api/events',
                { title, description, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            alert('Event created successfully!');
            setTitle('');
            setDescription('');
            setDate('');
    
            if (onEventCreated) {
                onEventCreated();
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setError(error.response?.data?.message || 'Failed to create event. Please try again.');
        }
    };
    

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <TextField
                    fullWidth
                    label="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Event Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Create Event
                </Button>
            </form>
        </Box>
    );
};

export default CreateEvent;
