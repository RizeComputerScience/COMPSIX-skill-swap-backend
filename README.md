# Skill Swap Backend API

Backend API for the Skill Swap platform using Express, Sequelize, and SQLite.

## Setup Instructions

1. Install dependencies:
```bash
   npm install
```

2. Create a `.env` file in the root directory with:
```
   DB_STORAGE=./database.sqlite
   PORT=3000
```

3. Initialize the database and add sample data:
```bash
   npm run setup
```

4. Start the server:
```bash
   npm start
```

5. Test the API by visiting `http://localhost:3000/api/skills` in your browser

## API Endpoints

### GET /api/skills
Returns all skills from the database.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Python Tutoring",
    "description": "Learn Python fundamentals",
    "category": "Programming",
    "price": 20,
    "provider": "Sarah Chen"
  }
]
```

### POST /api/skills
Creates a new skill.

**Request Body:**
```json
{
  "title": "Cooking Lessons",
  "description": "Learn to cook Italian cuisine",
  "category": "Cooking",
  "price": 30,
  "provider": "Chef Tony"
}
```

**Response:**
```json
{
  "id": 6,
  "title": "Cooking Lessons",
  "description": "Learn to cook Italian cuisine",
  "category": "Cooking",
  "price": 30,
  "provider": "Chef Tony"
}
```