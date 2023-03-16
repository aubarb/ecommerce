import { baseUrl } from "./baseUrl";
import axios from "axios";

export const getCartItems = async (userId) => {
  try {
    const result = await axios(`${baseUrl}/cart_items/${userId}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error.reponse.data);
  }
};

export const addCartItems = async (id, quantity, userId) => {
  try {
    const body = {
      product_id: id,
      quantity: quantity,
    };
    const response = await axios.post(`${baseUrl}/cart_items/${userId}`, body);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
