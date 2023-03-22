import { baseUrl } from "./baseUrl";
import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios(`${baseUrl}/account`, {
      headers: { token: localStorage.token },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const updateUser = async (first_name, last_name, id) => {
  try {
    const body = { first_name, last_name };
    const response = await axios(`${baseUrl}/users/${id}`, body);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const updateUserPassword = async (password, id) => {
  try {
    const body = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    };
    const response = await axios.put(`${baseUrl}/auth/edit/${id}`, body);
    const data = await response.data;
    return data;
  } catch (error) {
    if (error.response.data === "Incorrect password")
      return error.response.data;
    console.error(error.response.data);
  }
};
