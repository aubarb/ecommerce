import { baseUrl } from "./baseUrl";
import axios from "axios";

export const verifyAuth = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/auth/verify`, {
      headers: { token: token },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const register = async (first_name, last_name, email, password) => {
  try {
    const body = { first_name, last_name, email, password };
    const response = await axios.post(`${baseUrl}/auth/register`, body);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    return(error.response.data);
  }
};

export const login = async (email, password) => {
  try {
    const body = { email, password };
    const response = await axios.post(`${baseUrl}/auth/login`, body);
    const data = await response.data;
    return data;
  } catch (error) {
    return(error.response.data);
  }
};
