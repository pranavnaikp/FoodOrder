import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, TextField,Snackbar, Alert } from '@mui/material';
import MealCard from './components/MealCard';
import Cart from './components/cart';


const App = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [labels, setLabels] = useState([]);
  const [people, setPeople] = useState([
    { id: 1, name: 'Person 1', selectedMealId: null },
    { id: 2, name: 'Person 2', selectedMealId: null }
  ]);

  
  const [selectedTag, setSelectedTag] = useState('All Meals');
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchData(); // Fetch meals from the backend when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://food-order-xx1t.onrender.com/meals');
      setMeals(response.data);
      setFilteredMeals(response.data);
      extractLabels(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const extractLabels = (mealsData) => {
    const uniqueLabels = new Set();
    mealsData.forEach((meal) => {
      meal.labels.forEach((label) => {
        uniqueLabels.add(label.label);
      });
    });
    setLabels(Array.from(uniqueLabels));
  };

  const handleFilter = (label) => {
    if (label === 'All Meals') {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) =>
        meal.labels.some((l) => l.label === label)
      );
      setFilteredMeals(filtered);
    }
    setSelectedTag(label);
  };

  const handleAddToCart = (meal) => {
    const isMealInCart = cart.some((item) => item.id === meal.id);
    
    if (isMealInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === meal.id && meal.drink) {
          // Check if the drink is already in the cart
          const isDrinkInCart = cart.some((cartItem) => cartItem.id === meal.drink.id);
          if (!isDrinkInCart) {
            return [item, meal.drink];
          }
        }
        return item;
      }).flat();
    
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
    } else {
      // If the meal is not in the cart, add it
      setCart([...cart, meal]);
      calculateTotalPrice([...cart, meal]);
    }
  };
  



  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const calculateTotalPrice = (cartItems) => {
    let totalPrice = 0;
    const selectedMealIds = {};
  
    cartItems.forEach((item) => {
      if (!item.hasOwnProperty('drink')) {
        // If the item doesn't have a drink, it's a meal
        const isDoublePrice = selectedMealIds[item.id];
        totalPrice += isDoublePrice ? item.price * 2 : item.price;
        selectedMealIds[item.id] = isDoublePrice ? false : true;
      } else {
        // If the item has a drink, add its price
        totalPrice += item.price;
      }
    });
  
    setTotalPrice(totalPrice);
  };
  
  
  const handleSelectPerson = (personId, mealId, drinkId = null) => {
    const updatedPeople = people.map((person) => {
      if (person.id === personId) {
        // Deselect the meal and drink if the person is already selected for the meal
        if (person.selectedMealId === mealId) {
          return { ...person, selectedMealId: null, selectedDrinkId: null };
        }
        return { ...person, selectedMealId: mealId, selectedDrinkId: drinkId };
      }
      return person;
    });
  
    setPeople(updatedPeople);
    updateCartAndTotalPrice(updatedPeople);
  };
  
  

  const updateCartAndTotalPrice = (updatedPeople) => {
    const updatedCart = [];
    let totalPrice = 0;
  
    updatedPeople.forEach((person) => {
      if (person.selectedMealId !== null) {
        const selectedMeal = meals.find((meal) => meal.id === person.selectedMealId);
        if (selectedMeal) {
          updatedCart.push(selectedMeal);
          totalPrice += selectedMeal.price;
  
          if (person.selectedDrinkId !== null) {
            const selectedDrink = selectedMeal.drinks.find((drink) => drink.id === person.selectedDrinkId);
            if (selectedDrink) {
              updatedCart.push(selectedDrink);
              totalPrice += selectedDrink.price;
            }
          }
        }
      }
    });
  
    setCart(updatedCart);
    setTotalPrice(totalPrice);
  };
  
  const handlePlaceOrder = async () => {
    try {
      // Create an array to store selected meals and drinks
      const selectedItems = [];
  
      // Fill selectedItems array with the data from cart
      cart.forEach((item) => {
        selectedItems.push({
          id: item.id,
          title: item.title,
          price: item.price,
          // Add any other necessary properties
        });
  
        // If the item is a drink, add it separately or include it with meal details
        if (item.hasOwnProperty('drink')) {
          selectedItems.push({
            id: item.drink.id,
            title: item.drink.title,
            price: item.drink.price,
            // Add any other necessary properties
          });
        }
      });
  
      // Calculate total price based on selected items
      const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
  
      // Send data to the backend
      const response = await axios.post('https://food-order-xx1t.onrender.com/place-order', {
        selectedItems,
        totalPrice,
        // Add any other necessary data to send to the backend
      });
  
      if (response.status === 201) {
        // Handle successful response
        console.log('Order placed successfully:', response.data);
  
        // Show toast/notification for successful order placement
        setSnackbarOpen(true);
  
        // Empty the cart on successful order placement
        setCart([]);
        setTotalPrice(0);
      }
    } catch (error) {
      // Handle error state or show an error message to the user
      console.error('Error placing order:', error);
    }
  };
  

  
  return (
    <div style={{ textAlign: 'center', margin: 'auto', width: '80%' }}>
      <h1>Meal Details</h1>
      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Label</h3>
        <Button
  style={{
    border: '1px solid #ccc', // Modify border properties as needed
    borderRadius: '5px', // Optional: Add border-radius for rounded corners
    padding: '8px 12px', // Optional: Adjust padding for button size
    marginRight: '8px', // Optional: Adjust margin between buttons
  }}
  onClick={() => handleFilter('All Meals')}
>
  All Meals
</Button>
{labels.map((label) => (
  <Button
    key={label}
    onClick={() => handleFilter(label)}
    style={{
      border: '1px solid #ccc', // Modify border properties as needed
      borderRadius: '5px', // Optional: Add border-radius for rounded corners
      padding: '8px 12px', // Optional: Adjust padding for button size
      marginRight: '8px', // Optional: Adjust margin between buttons
    }}
  >
    {label}
  </Button>
))}

     
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Grid container spacing={2}>
          {filteredMeals.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.id}>
              <MealCard
                meal={meal}
                handleAddToCart={handleAddToCart}
                people={people}
                handleSelectPerson={handleSelectPerson}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Cart
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        totalPrice={totalPrice}
        handlePlaceOrder={handlePlaceOrder}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
export default App;

