const pool = require("../config/db.js");

exports.getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json("Missing required field(s)");
  }

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3",
    [first_name, last_name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      results.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};
