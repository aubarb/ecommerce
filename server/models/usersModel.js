const pool = require("../config/db.js");

const UsersModel = {

  getAll: async () => {
    try {
      const result = await pool.query("SELECT * FROM users");
      return result.rows;
    } catch (error) {
      console.error(error.message);
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error.message);
    }
  },

  update: async (id, first_name, last_name) => {
    try {
      await pool.query(
        "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3",
        [first_name, last_name, id]);
      return "User edited successfully"
    } catch (error) {
      console.error(error.message);
    }
  },

  delete: async (id) => {
    try {
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
      return "User deleted successfully"
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = UsersModel;
