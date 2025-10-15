const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false
});

// Initialize models
const db = {};
db.Skill = require('./models/skill')(sequelize);

// Routes
const skillRoutes = require('./routes/skills')(db);
app.use('/api/skills', skillRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Skill Swap API is running' });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/api/skills`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};

startServer();