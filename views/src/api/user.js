import { baseUrl } from "./baseUrl";

export const getUser = async () => {
  try {
    const response = await fetch(`${baseUrl}/account`, {
      method: "GET",
      headers: { token: localStorage.token }, //we send the token in the header, back-end middleware receives req.header("token")
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

export const updateUser = async (first_name, last_name, id) => {
  try {
    const body = { first_name, last_name };
    const result = await fetch(`${baseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const res = await result.json();
    return res;
  } catch (err) {
    console.error(err.message);
  }
};

export const updateUserPassword = async (password, id) => {
  try {
    const body = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
    };
    const response = await fetch(`${baseUrl}/auth/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
};
