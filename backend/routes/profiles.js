const express = require('express');
const router = express.Router();
const axios = require('axios');

// Example URL format: /api/profiles?codeforces=cf_user&leetcode=lc_user&codechef=cc_user
router.get('/', async (req, res) => {
  const { codeforces, leetcode, codechef } = req.query;

  try {
    const responses = await Promise.all([
      axios.get(`https://competeapi.vercel.app/user/codeforces/${codeforces}`),
      axios.get(`https://competeapi.vercel.app/user/leetcode/${leetcode}`),
      axios.get(`https://competeapi.vercel.app/user/codechef/${codechef}`)
    ]);
        console.log("Codeforces:");
        console.dir(responses[0].data, { depth: null });

        console.log("LeetCode:");
        console.dir(responses[1].data, { depth: null });

        console.log("CodeChef:");
        console.dir(responses[2].data, { depth: null });


    res.json({
      codeforces: responses[0].data,
      leetcode: responses[1].data,
      codechef: responses[2].data
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error: error.message });
  }
});

module.exports = router;
