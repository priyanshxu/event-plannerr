// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Box,
  Toolbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      console.log(response);

      setSuccess('Registration successful! You can now log in.');
      setOpen(true); // Open success snackbar

      // Redirect the user to the login page after a short delay
      setTimeout(() => {
        navigate('/'); // Use navigate to redirect
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      setError(err.response.data.msg || 'Registration failed. Please try again.');
      setOpen(true); // Open error snackbar
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/eventms.jpg" // Update the logo path
              alt="EventMS"
              style={{ width: '300px', height: 'auto' , alignContent : 'center'}} // Adjust size as needed
            />
          </Box>
        </Toolbar>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center">
          Register
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleRegister} // Use onClick to handle registration
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Register
        </Button>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;