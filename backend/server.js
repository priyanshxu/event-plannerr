const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const expenseRoutes = require('./routes/expense');
const chatRoutes = require('./routes/chat'); // Import chat routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/chat', chatRoutes); // Add chat routes

const PORT = process.env.PORT || 5000;

// Create HTTP server and integrate Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for incoming messages
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});