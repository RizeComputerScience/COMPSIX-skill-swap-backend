
// Used AI to help with coding and testing.
// Main server file for the Skill Swap backend.

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Create the Express application.
const app = express();

// Middleware.
app.use(cors());
app.use(express.json());

// Connect to the SQLite database.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: false
});

// Load the Skill model.
const db = {};

db.Skill = require('./models/skill')(sequelize);

// Connect the skills routes.
const skillsRoutes = require('./routes/skills')(db);

app.use('/api/skills', skillsRoutes);

// Basic home route.
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Skill Swap API!'
    });
});

// Start the server.
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Check the database connection.
        await sequelize.authenticate();

        console.log('Connected to the Skill Swap database.');

        // Create missing tables without deleting existing records.
        await sequelize.sync();

        console.log('Database synchronized.');

        // Start Express.
        app.listen(PORT, () => {
            console.log(`Skill Swap API running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
}

startServer();
