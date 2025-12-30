const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const articleRoutes = require('./routes/articles');

const app = express();

// Middleware
// Updated CORS to allow frontend origins
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'BeyondChat API is running' });
});

app.use('/api/articles', articleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
