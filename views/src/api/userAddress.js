import { baseUrl } from "./baseUrl";

export const getUserAddress = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/user_addresses?user_id=${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
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
    const response = await fetch(`${baseUrl}/user_addresses/${id}`, {
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
