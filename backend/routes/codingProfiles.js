const express = require('express');
const axios = require('axios');
const router = express.Router();
const CodingProfile = require('../models/CodingProfile');

// Verification functions
const verifyLeetCodeUser = async (username) => {
    try {
        const response = await axios.get(`https://competeapi.vercel.app/user/leetcode/${username}`);
        const isValidUser = response.data?.data?.matchedUser !== null;
        if (isValidUser) {
          return true;
        } else {
           return false;
        }
  } catch {
    return false;
  }
};

const verifyCodeforcesUser = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    return response.data.status === 'OK';
  } catch {
    return false;
  }
};

const verifyCodechefUser = async (username) => {
  try {
    const response = await axios.get(`https://competeapi.vercel.app/user/codechef/${username}`);
    return !response.data.error;
  } catch (error) {
    return false;
  }
};

router.post('/add-profile', async (req, res) => {
  const { userId, leetcode, codeforces, codechef } = req.body;

  if (!userId) return res.status(400).json({ message: 'User ID is required' });

  const validProfiles = {};

  if (leetcode && await verifyLeetCodeUser(leetcode)) validProfiles.leetcode = leetcode;
  if (codeforces && await verifyCodeforcesUser(codeforces)) validProfiles.codeforces = codeforces;
  if (codechef && await verifyCodechefUser(codechef)) validProfiles.codechef = codechef;

  try {
    let profile = await CodingProfile.findOne({ userId });

    if (profile) {
      // only update provided valid usernames
      if (validProfiles.leetcode) profile.leetcode = validProfiles.leetcode;
      if (validProfiles.codeforces) profile.codeforces = validProfiles.codeforces;
      if (validProfiles.codechef) profile.codechef = validProfiles.codechef;

      await profile.save();
    } else {
      // create new
      profile = new CodingProfile({
        userId,
        ...validProfiles
      });
      await profile.save();
    }
    res.status(201).json({
      message: 'Profile saved successfully',
      
      saved: validProfiles
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



// === Get Profile ===

router.get('/get-profile/:userId', async (req, res) => {
  try {
    const profile = await CodingProfile.findOne({ userId: req.params.userId });

    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
