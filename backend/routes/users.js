// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/post');

// Get user profile by ID or username
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    const posts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
