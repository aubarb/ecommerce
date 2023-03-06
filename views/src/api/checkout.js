import { baseUrl } from "./baseUrl";
import axios from "axios";

export const checkout = async (cartItems, userId) => {
  try {
    const body = { cartItems, userId };
    const response = await axios.post(`${baseUrl}/checkout`, body);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
