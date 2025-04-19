const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const response = await axios.get(`https://competeapi.vercel.app/user/codechef/${username}`);
    //console.dir(response.data, { depth: null });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching CodeChef profile', error: error.message });
  }
});

module.exports = router;
