import React from 'react';
import { Card, CardContent, Typography, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid } from '@mui/material';

const MealCard = ({ meal, handleAddToCart, people, handleSelectPerson }) => {
  return (
  
        <Grid item xs={12} sm={6} md={6} lg={10}>
      <Card variant="outlined" style={{ height: '100%', border: '1px solid #C9E2EF', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {meal.title}
          </Typography>

          <Typography color="textSecondary">
            Starter: {meal.starter}
          </Typography>
          <Typography color="textSecondary">
            Desert: {meal.desert}
          </Typography>
          <Typography color="textSecondary">
            Price: {meal.price}
          </Typography>
          <img src={meal.img} alt={meal.title} style={{ width: '100%',height:'200px', objectFit: 'cover' }} />
          <FormControl fullWidth>
            <InputLabel id={`select-drink-label-${meal.id}`}>Select a Drink</InputLabel>
            <Select
              labelId={`select-drink-label-${meal.id}`}
              id={`select-drink-${meal.id}`}
              value={''}
              label="Select a Drink"
              onChange={(e) => handleAddToCart({ ...meal, drink: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {meal.drinks.map((drink) => (
                <MenuItem key={drink.id} value={drink}>
                  {drink.title} - ${drink.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            {people.map((person) => (
              <FormControlLabel
                key={`${person.id}-${meal.id}`}
                control={
                  <Checkbox
                    checked={person.selectedMealId === meal.id}
                    onChange={() => handleSelectPerson(person.id, meal.id)}
                  />
                }
                label={person.name}
              />
            ))}
          </div>
          <Button onClick={() => handleAddToCart(meal)}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MealCard;
