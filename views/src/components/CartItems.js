import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/API";

export default function CartItems() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${baseUrl}/cart_items`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          user_id: 1,
        },
      });
      setCartItems(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>CartItems</h2>
      <ul>
        {cartItems.map((cartItem) => (
          <li>
            {cartItem.product_id} Quantity: {cartItem.quanity}
          </li>
        ))}
      </ul>
    </div>
  );
}
