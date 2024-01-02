const express = require('express');
const Order = require('../models/order'); // Import the Order model

const ordersRouter = express.Router();

ordersRouter.post('/place-order', async (req, res) => {
  try {
    const { selectedItems, totalPrice } = req.body;
    console.log('Received data:', selectedItems, totalPrice);

    const orders = [];

    selectedItems.forEach((selectedItem) => {
      const { id, title, price } = selectedItem; // Extract fields from selectedItem

      // Create an order object for each selected item
      const newOrder = new Order({
        meal: { id, title, price }, // Store meal details directly in the 'meal' field
        quantity: 1, // Assuming each item corresponds to one quantity
        totalPrice: price, // Assuming 'price' represents the price of the item
        // Add any other necessary properties
      });

      orders.push(newOrder);
    });

    // Save all the orders to the database
    const savedOrders = await Order.insertMany(orders);

    res.status(201).json(savedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});

module.exports = ordersRouter;
