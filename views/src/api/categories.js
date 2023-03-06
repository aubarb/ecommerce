import { baseUrl } from "../api/baseUrl";
import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`);
    const data = response.data
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
