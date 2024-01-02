const mongoose = require('mongoose');

// Define the schema for labels
const LabelSchema = new mongoose.Schema({
  id: String,
  label: String,
});

// Define the schema for drinks
const DrinkSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
});

// Define the schema for meals
const MealSchema = new mongoose.Schema({
  id: String,
  title: String,
  starter: String,
  desert: String,
  price: Number,
  labels: [LabelSchema], // Reference to LabelSchema
  img: String,
  drinks: [DrinkSchema], // Reference to DrinkSchema
});

// Create a Mongoose model for Meal using the MealSchema
const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;
