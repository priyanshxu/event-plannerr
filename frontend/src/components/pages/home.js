import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container>
      {/* Logo Section */}
      <Box display="flex" justifyContent="center" my={4}>
        <img src="/eventms.jpg" alt="Event Planner Logo" style={{ width: '350px', }} />
      </Box>

      {/* Navigation Bar */}
      <AppBar position="static" color="black" elevation={0}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/help">Help</Button>
          <Button color="inherit" component={Link} to="/logout">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box textAlign="center" mt={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Your Online Event Planning Companion
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Manage your events, organize schedules, and keep your team connected all in one place.
        </Typography>

        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard"
            sx={{ mx: 2 }}
          >
            Create an Event
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/dashboard"
            sx={{ mx: 2 }}
          >
            My Events
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
