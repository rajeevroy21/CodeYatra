const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/upcoming', async (req, res) => {
  try {
    const response = await axios.get('https://competeapi.vercel.app/contests/upcoming');
    
    // Optional: Filter or sort if needed
    const contests = response.data;

    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming contests', error: error.message });
  }
});

module.exports = router;
