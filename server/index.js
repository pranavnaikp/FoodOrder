const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mealsController = require('./controllers/mealsController');
const ordersController = require('./controllers/orderController');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pranavnaik:FoodOrder@cluster0.gv3tdem.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/meals', mealsController);
app.use('/', ordersController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});