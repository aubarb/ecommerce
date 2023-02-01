const db = require('../config/db.js');

exports.addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body
  db.query('INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)', [user_id, product_id, quantity], (error, result) => {
      if (error) {
          throw error
      }
      res.status(201).send({message: "Product added to cart successfully"})
  })
}

exports.getCart = (req, res) => {
  const { user_id } = req.body
  db.query('SELECT * FROM cart_items WHERE user_id = $1', [user_id], (error, result) => {
      if (error) {
          throw error
      }
      res.status(200).json(result.rows)
  })
}

exports.updateCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body
  db.query('UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3', [quantity, user_id, product_id], (error, result) => {
      if (error) {
          throw error
      }
      res.status(200).send({message: "Cart updated successfully"})
  })
}