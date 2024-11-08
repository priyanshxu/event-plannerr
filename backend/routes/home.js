// routes/home.js
const express = require('express');
const router = express.Router();

// Example route for fetching home page data
router.get('/data', (req, res) => {
  // Fetch data from the database or any other source
  const homeData = {
    title: "Home Page",
    description: "Welcome to the home page of our MERN application."
  };
  res.json(homeData);
});

module.exports = router;