const pool = require("../config/db.js");

exports.getAllOrders = (req, res) => {
  pool.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

exports.getOrderById = (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM orders WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows[0]);
  });
};

exports.createOrder = (req, res) => {
  const { user_id, total, payment_id } = req.body;
  pool.query(
    "INSERT INTO orders (user_id, total, payment_id) VALUES ($1, $2, $3)",
    [user_id, total, payment_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Order Details created`);
    }
  );
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { user_id, total, payment_id } = req.body;
  pool.query(
    "UPDATE orders SET user_id = $1, total = $2, payment_id = $3 WHERE id = $4",
    [user_id, total, payment_id, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Order Details modified with ID: ${id}`);
    }
  );
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  pool.query("DELETE FROM orders WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Order Details deleted with ID: ${id}`);
  });
};
