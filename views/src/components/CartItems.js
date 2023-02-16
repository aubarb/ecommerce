import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3000/cart_items', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          user_id: 1
        }
      });
      console.log(result);
      setCartItems(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>CartItems</h2>
      <ul>
        {cartItems.map(cartItem => (
          <li>
            {cartItem.product_id} Quantity: {cartItem.quanity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
