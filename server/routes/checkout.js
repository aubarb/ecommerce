const express = require("express");
const checkoutRouter = express.Router();

exports.checkoutRouter = (req, res) => {
  const { user_id, total, payment_details } = req.body;
  db.query(
    "SELECT * FROM cart_items WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error fetching cart items" });
      }
      if (!results || !results.rows || results.rows.length === 0) {
        return res.status(500).send({ message: "cart is empty" });
      }
      if (!payment_details) {
        return res.status(500).send({ message: "Payment details required" });
      }
      db.query(
        "INSERT INTO orders (user_id, total, payment_details) VALUES ($1, $2, $3)"[
          (user_id, total, payment_details)
        ],
        (error, results) => {
          if (error) {
            return res
              .status(500)
              .send({ message: "Error creating the order" });
          }
          db.query(
            "INSERT INTO order_items (order_id, product_id, quantity) SELECT order_details.order_id, cart_items.product_id, cart_items.quantity FROM order_details INNER JOIN cart_items ON cart_items.user_id = order_details.user_id",
            (error, results) => {
              if (error) {
                return res
                  .status(500)
                  .send({ message: "Could not fetch item from cart" });
              }
            }
          );
          res.status(201).send({ message: "Order created successfully" });
        }
      );
    }
  );
};

module.exports = checkoutRouter;
