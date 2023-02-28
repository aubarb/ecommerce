import axios from "axios";
import { baseUrl } from "./baseUrl";

export const getUserAddress = async (id) => {
  try {
    const response = await axios(`${baseUrl}/user_addresses?user_id=${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const updateUserAddress = async (
  id,
  address_line1,
  address_line2,
  city,
  postal_code,
  country
) => {
  try {
    const body = { address_line1, address_line2, city, postal_code, country };
    const response = await axios(`${baseUrl}/user_addresses/${id}`, body);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};
