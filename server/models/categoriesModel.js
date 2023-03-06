const pool = require("../config/db.js");

const CategoriesModel = {
  getAll: async () => {
    try {
      const result = await pool.query("SELECT * FROM categories");
      return result.rows;
    } catch (error) {
      console.error(error);
    }
  },

  getById: async (id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  create: async (name, description) => {
    try {
      const result = await pool.query(
        "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  update: async (id, name, description) => {
    try {
      const result = await pool.query(
        "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id) => {
    try {
      await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CategoriesModel;
