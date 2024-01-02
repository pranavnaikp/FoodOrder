const express = require('express');
const Meal = require('../models/model'); // Import the Meal model

const mealsRouter = express.Router();

mealsRouter.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mealsRouter.get('/:label', async (req, res) => {
  const { label } = req.params;
  try {
    const meals = await Meal.find({ 'labels.id': label });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = mealsRouter;
