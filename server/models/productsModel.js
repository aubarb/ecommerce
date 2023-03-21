const pool = require("../config/db.js");

const ProductsModel = {
  getAll: async () => {
    try {
      const result = await pool.query("SELECT * FROM products");
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting products");
    }
  },

  getById: async (id) => {
    if (!id) throw new Error("id is required");
    try {
      const result = await pool.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      if (result.rows.length === 0) throw new Error("Product not found");
      return result.rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Error getting the product by Id");
    }
  },

  create: async (product) => {
    const { name, price, description, stock, category_id, image } = product;
    if (!name || !price  || !description || !stock || !category_id || image) throw new Error('Missing product information');
    try {
      const result = await pool.query(
        "INSERT INTO products (name, price, description, stock, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, price, description, stock, category_id, image]
      );
      return result.rows[0];
    } catch (error) {
      if (error.constraint === "products_category_id_fkey") throw new Error("Invalid category ID");
      console.error(error.message)
    }
  },

  update: async (id, product) => {
    const { name, price, description, stock, category_id, image } = product;
    try {
      const result = await pool.query(
        "UPDATE products SET name = $1, price = $2, description = $3, stock = $4, category_id = $5, image = $6 WHERE id = $7 RETURNING *",
        [name, price, description, stock, category_id, image, id]
      );
      if (result.rows.length === 0) {
        throw new Error("Product not found");
      }
      return result.rows[0];
    } catch (err) {
      console.error(err.message);
      throw new Error("Error updating product");
    }
  },

  delete: async (id) => {
    if (!id) throw new Error("id is required");
    try {
      const result = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      if (result.rows.length === 0) {
        throw new Error("Product not found");
      }
      await pool.query("DELETE FROM products WHERE id = $1", [id]);
      return `Product with id: ${id} deleted`;
    } catch (err) {
      console.error(err.message);
      throw new Error("Error deleting product");
    }
  },
};

module.exports = ProductsModel;