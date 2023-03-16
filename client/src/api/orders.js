import { baseUrl } from "./baseUrl";
import axios from "axios";

export const getOrders = async (user_id) => {
  try {
    const result = await axios(`${baseUrl}/orders/${user_id}`);
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error.reponse.data);
  }
};

export const getOrderItems = async (order_id) => {
  try {
    const result = await axios(`${baseUrl}/order_items/${order_id}`);
    const data = result.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};
