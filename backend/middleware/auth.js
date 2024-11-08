const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Optional: useful if you want to fetch user details from DB

const auth = async (req, res, next) => {
    try {
        // Extract token from header and verify it
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send({ error: 'Authentication token required.' });
        }

        // Verify token with the secret from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fetch secret from environment variables

        // Attach user data to request object (decoded should include user id if correctly set up)
        req.user = { id: decoded.id };

        next(); // Proceed to next middleware or route handler
    } catch (error) {
        // Handle token errors or missing tokens
        res.status(401).send({ error: 'Invalid or expired token. Please log in again.' });
    }
};

module.exports = auth;
