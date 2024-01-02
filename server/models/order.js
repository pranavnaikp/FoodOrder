const mongoose = require('mongoose');

// Define a schema for meal details
const MealSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
});

const OrderSchema = new mongoose.Schema({
  meal: {
    type: MealSchema, // Reference to the MealSchema
    required: true,
  },
 
  quantity: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
