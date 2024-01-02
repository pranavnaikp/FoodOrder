import React from 'react';
import { Button } from '@mui/material';

const Cart = ({ cart, handleRemoveFromCart, totalPrice, handlePlaceOrder }) => {
  return (
    <div>
    <h2>Cart</h2>
    {cart.map((cartItem, index) => (
      <div key={index}>
        <p>{cartItem.title}</p>
        <Button onClick={() => handleRemoveFromCart(index)}>
          Remove
        </Button>
      </div>
    ))}
    <p>Total Price: {totalPrice}</p>
    <Button onClick={handlePlaceOrder}>Place Order</Button>

  </div>
  );
};

export default Cart;
