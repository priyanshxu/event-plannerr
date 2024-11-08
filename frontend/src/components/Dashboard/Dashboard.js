import React, { useState } from 'react';
import { Box, Typography, Paper, Card, CardContent } from '@mui/material';
import CreateEvent from '../Event/CreateEvent';
import EventList from '../Event/EventList';
import CreateExpense from '../Expense/CreateExpense';
import ExpenseList from '../Expense/ExpenseList';

const Dashboard = () => {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEventSelect = (eventId) => {
        setSelectedEventId(eventId);
    };
    
    const handleEventCreated = () => {
        setRefresh((prev) => !prev); // Toggle refresh state to refresh event list
    };

    return (
        <Box sx={{ p: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            <Typography variant="h1" align="center" gutterBottom color="primary">
                Dashboard
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
                <Card sx={{ width: '300%', maxWidth: 800, backgroundColor: '#e3f2fd' }}>
                    <CardContent>
                        <Typography variant="h3" color="primary" gutterBottom>
                            Create a New Event
                        </Typography>
                        <CreateEvent onEventCreated={handleEventCreated} />
                    </CardContent>
                </Card>

                <Card sx={{ width: '300%', maxWidth: 800, backgroundColor: '#fffde7' }}>
                    <CardContent>
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Your Events
                        </Typography>
                        <EventList refresh={refresh} onEventSelect={handleEventSelect} />
                    </CardContent>
                </Card>

                {selectedEventId && (
                    <Paper sx={{ width: '100%', maxWidth: 600, p: 2, mt: 4, backgroundColor: '#f3e5f5' }}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Manage Expenses for Selected Event
                        </Typography>

                        <Box display="flex" flexDirection="column" gap={2}>
                            <CreateExpense eventId={selectedEventId} />
                            <ExpenseList eventId={selectedEventId} />
                        </Box>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
