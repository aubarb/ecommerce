import { baseUrl } from "./baseUrl";
import axios from "axios";

export const getProducts = async () => {
  try {
    const result = await axios.get(`${baseUrl}/products`);
    return result.data;
  } catch (err) {
    throw new Error(`Could not get products: ${err.message}`);
  }
};
