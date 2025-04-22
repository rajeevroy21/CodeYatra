const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://code-yatra-9bdu.vercel.app"],
  credentials: true,
}));

dotenv.config(); 
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const codeforcesRoute = require('./routes/codeforces');
const leetcodeRoute = require('./routes/leetcode');
const codechefRoute = require('./routes/codechef');
const contestRoute=require("./routes/upcomingcontest");
const CodingProfile=require("./routes/codingProfiles");
const googleCalendarRoutes = require('./routes/googleCalendar');
app.use('/api/codeforces', codeforcesRoute);
app.use('/api/leetcode', leetcodeRoute);
app.use('/api/codechef', codechefRoute);
app.use('/api/contests', contestRoute);
app.use('/api/auth', authRoutes);
app.use('/api', CodingProfile);
app.use('/api/google', googleCalendarRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


