import { baseUrl } from "../api/baseUrl";
import axios from "axios";

export const getCartItems = async (userId) => {
  try {
    const result = await axios.get(`${baseUrl}/cart_items/${userId}`);
    const data = result.data;
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export const addCartItems = async (id, quantity, userId) => {
  try {
    const body = {
      product_id: id,
      quantity: quantity,
    };
    const response = await axios.post(`${baseUrl}/cart_items/${userId}`, body);
    return response;
  } catch (err) {
    console.error(err.message);
  }
};