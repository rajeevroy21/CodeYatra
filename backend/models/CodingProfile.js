const mongoose = require('mongoose');

const CodingProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  leetcode: String,
  codeforces: String,
  codechef: String,
});

module.exports = mongoose.model('CodingProfile', CodingProfileSchema);
