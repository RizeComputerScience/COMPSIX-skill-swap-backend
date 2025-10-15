const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false
});

const db = {};
db.Skill = require('./models/skill')(sequelize);

const sampleSkills = [
  {
    title: 'Python Tutoring',
    description: 'Learn Python fundamentals and data structures',
    category: 'Programming',
    price: 20,
    provider: 'Sarah Chen'
  },
  {
    title: 'Guitar Lessons',
    description: 'Beginner to intermediate guitar instruction',
    category: 'Music',
    price: 15,
    provider: 'Mike Johnson'
  },
  {
    title: 'Resume Review',
    description: 'Professional resume feedback and editing',
    category: 'Career',
    price: 0,
    provider: 'Alex Martinez'
  },
  {
    title: 'Web Development',
    description: 'HTML, CSS, and JavaScript fundamentals',
    category: 'Programming',
    price: 25,
    provider: 'Emma Thompson'
  },
  {
    title: 'Spanish Conversation',
    description: 'Practice conversational Spanish',
    category: 'Language',
    price: 10,
    provider: 'Carlos Rodriguez'
  }
];

const setupDatabase = async () => {
  try {
    // Sync database (create tables)
    await sequelize.sync({ force: true });
    console.log('Database tables created');

    // Add sample data
    await db.Skill.bulkCreate(sampleSkills);
    console.log('Sample skills added');

    console.log('Database setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();