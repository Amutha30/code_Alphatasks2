require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const path = require('path');
const userRoutes = require('./routes/users');
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();
app.use('/api/users', userRoutes);
// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static image files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));
  // Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));


module.exports = app;
