const db = require('../config/db.js');

exports.getAllCartItems = (req, res) => {
    db.query('SELECT * FROM cart_item', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  
exports.getCartItemById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cart_item WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    })
}
  
exports.createCartItem = (req, res) => {
    const { id, session_id, product_id, quantity } = req.body
    db.query('INSERT INTO cart_item (id, session_id, product_id, quantity) VALUES ($1, $2, $3, $4)', [id, session_id, product_id, quantity], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Cart item created`)
    })
}
  
exports.updateCartItem = (req, res) => {
    const id = req.params.id;
    const { session_id, product_id, quantity } = req.body
    db.query(
      'UPDATE cart_item SET session_id = $1, product_id = $2, quantity = $3 WHERE id = $4',
      [session_id, product_id, quantity, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Cart item modified with ID: ${id}`)
    })
}
     
exports.deleteCartItem = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM cart_item WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Cart Item deleted with ID: ${id}`)
    })
}