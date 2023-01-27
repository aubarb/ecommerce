const db = require('../config/db.js');

exports.getAllOrderItems = (req, res) => {
  db.query('SELECT * FROM order_items', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}
  
exports.getOrderItemById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM order_items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}
  
exports.createOrderItem = (req, res) => {
    const { id, order_id, product_id, quantity } = req.body;
    db.query(
      'INSERT INTO order_items (id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4)',
      [id, order_id, product_id, quantity],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(201).send(`Order item created`)
    })
}

exports.updateOrderItem = (req, res) => {
  const id = req.params.id;
  const { order_id, product_id, quantity } = req.body
  db.query(
    'UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3 WHERE id = $4',
    [order_id, product_id, quantity, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Order Item modified with ID: ${id}`)
    })
}
  
exports.deleteOrderItem = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM order_items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Order Item deleted with ID: ${id}`)
  })
}