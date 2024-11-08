import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const EventList = ({ refresh }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found. Please log in.');
                return;
            }

            const response = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(
                error.response?.data?.message || 'Failed to fetch events. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [refresh]); // Re-fetch events when `refresh` prop changes

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, boxShadow: 2, borderRadius: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Your Events
            </Typography>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : events.length === 0 ? (
                <Typography align="center" variant="body1">
                    No events found. Create a new event!
                </Typography>
            ) : (
                <List>
                    {events.map((event) => (
                        <ListItem key={event._id} sx={{ border: '1px solid #ccc', borderRadius: '4px', mb: 1, p: 2 }}>
                            <ListItemText
                                primary={<Typography variant="h6">{event.title}</Typography>}
                                secondary={
                                    <>
                                        <Typography variant="body2">{event.description}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Date: {new Date(event.date).toLocaleDateString()}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default EventList;
