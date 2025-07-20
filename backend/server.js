const app = require('./app');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// Optional: Load environment variables from .env (if used)
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialapp";

// Make sure 'uploads' folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
});

// Serve static files from the uploads folder
app.use('/uploads', require('express').static(path.join(__dirname, 'uploads')));

// Middleware to log every request (great for debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
