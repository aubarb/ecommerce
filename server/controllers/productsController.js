const pool = require("../config/db.js");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, stock, category_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO products (name, price,	description, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, description, stock, category_id]
    );
    return res.status(201).json("Product created");
  } catch (error) {
    if (error.constraint === "products_category_id_fkey") {
      return res.status(400).json({ message: "Invalid category_id" });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, stock, category_id } = req.body;
    const result = await pool.query(
      "UPDATE products SET name =$1, price = $2, description = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING *",
      [name, price, description, stock, category_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    return res.status(201).json(`Product with ID: ${id} modified`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    if (productToDelete.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return res.status(200).send(`Product with id: ${id} deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
