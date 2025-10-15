const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET all skills
  router.get('/', async (req, res) => {
    try {
      const skills = await db.Skill.findAll();
      res.json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  // POST new skill
  router.post('/', async (req, res) => {
    try {
      const { title, description, category, price, provider } = req.body;
      
      if (!title || !description || !category || price === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const skill = await db.Skill.create({
        title,
        description,
        category,
        price,
        provider: provider || 'Anonymous'
      });

      res.status(201).json(skill);
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json({ error: 'Failed to create skill' });
    }
  });

  return router;
};