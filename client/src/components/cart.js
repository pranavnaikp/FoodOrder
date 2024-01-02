import React from 'react';
import { Button, Box } from '@mui/material';

const Cart = ({ cart, handleRemoveFromCart, totalPrice, handlePlaceOrder }) => {
  return (
    <Box sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Cart</h2>
      {cart.map((cartItem, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            borderBottom: '1px solid #eee',
            paddingBottom: '5px',
          }}
        >
          <p style={{ fontFamily: 'Arial', fontSize: '16px' }}>{cartItem.title}</p>
          <Button
            variant="outlined"
            onClick={() => handleRemoveFromCart(index)}
            sx={{ fontFamily: 'Arial', fontSize: '14px' }}
          >
            Remove
          </Button>
        </Box>
      ))}
      <p style={{ fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold' }}>Total Price: {totalPrice}</p>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        sx={{ fontFamily: 'Arial', fontSize: '16px', marginTop: '10px' }}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default Cart;
