const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
require('dotenv').config();

// Create OAuth2 client instance
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,        // Your Google Client ID
  process.env.CLIENT_SECRET,    // Your Google Client Secret
  process.env.REDIRECT_URI     // The redirect URI after authentication
);

// Step 1: Redirect user to Google OAuth2 authentication page
router.get('/google-signup', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',    // Offline access to refresh tokens
    scope: ['email', 'profile'],  // Request email and profile info
  });

  res.redirect(authUrl); // Redirect user to Google's OAuth page
});

// Step 2: Handle OAuth2 callback after user authentication
router.get('/google-callback', async (req, res) => {
  const { code } = req.query; // Get authorization code from the query string

  try {
    // Exchange the authorization code for tokens (access_token and refresh_token)
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens); // Set credentials for OAuth2 client

    // Use OAuth2 to get user profile data
    const oauth2 = google.oauth2({
      version: 'v2',
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get(); // Get user profile info

    // Save user info to the session or database (optional)
    const user = {
      name: data.name,
      email: data.email,
      picture: data.picture,
      googleId: data.id,  // Unique Google ID
    };

    // Here you can either create a session or save to a database
    req.session.user = user; // Store the user data in the session (optional)

    // Redirect user to a frontend route with their data (optional)
    res.redirect(`${process.env.FRONTEND_URI}/dashboard?user=${JSON.stringify(user)}`);
  } catch (error) {
    console.error('Error during Google authentication:', error);
    res.status(500).json({ error: 'OAuth failed' });
  }
});

module.exports = router;
