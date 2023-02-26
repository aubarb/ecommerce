import { baseUrl } from "./baseUrl";

export const verifyAuth = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/auth/verify`, {
      method: "GET",
      headers: { token: token },
    });
    const parsRes = await response.json();
    return parsRes;
  } catch (err) {
    throw new Error(`Not verified: ${err.message}`);
  }
};

export const register = async (first_name, last_name, email, password ) => {
  try {
    const body = { first_name, last_name, email, password };
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    throw new Error(`Failed to register: ${err.message}`);
  }
}

export const login = async (email, password) => {
  try {
    const body = { email, password };
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to login: ${err.message}`);
  }
}


