const pool = require("../config/db.js");

exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    if (result.rows.length === 0) {
      return res.status(404).send("No categories");
    }
    return res.status(201).send(result.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Category not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.createCategory = (req, res) => {
  const { name, description } = req.body;
  pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Category created`);
    }
  );
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      "UPDATE categories SET name =$1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Category not found");
    }
    return res.status(201).json(`Category with ID: ${id} modified`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    if (categoryToDelete.rows.length === 0) {
      return res.status(404).send("Category not found");
    }
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    return res.status(200).send(`Category with id: ${id} deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
