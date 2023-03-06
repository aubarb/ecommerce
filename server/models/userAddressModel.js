const pool = require("../config/db.js");

const UserAddressesModel = {
  
  getAll: async (user_id) => {
    try {
      if (user_id) {
        const result = await pool.query(
          "SELECT * FROM user_addresses WHERE user_id = $1",
          [user_id]
        );
        return result.rows[0];
      } else {
        const result = await pool.query("SELECT * FROM user_addresses");
        return result.rows;
      }
    } catch (error) {
      console.error(error);
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM user_addresses WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  create: async (
    user_id,
    address_line1,
    address_line2,
    city,
    postal_code,
    country
  ) => {
    try {
      const result = await pool.query(
        "INSERT INTO user_addresses (user_id, address_line1, address_line2, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6)",
        [user_id, address_line1, address_line2, city, postal_code, country]
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  update: async (
    id,
    address_line1,
    address_line2,
    city,
    postal_code,
    country
  ) => {
    try {
      const result = await pool.query(
        "UPDATE user_addresses SET address_line1 = $1, address_line2 = $2, city = $3, postal_code = $4, country = $5 WHERE id = $6",
        [address_line1, address_line2, city, postal_code, country, id]
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM user_addresses WHERE id = $1",
        [id]
      );
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserAddressesModel;