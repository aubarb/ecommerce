const db = require('../config/db.js');

exports.getAllOrderDetails = (req, res) => {
    db.query('SELECT * FROM order_details', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  
exports.getOrderDetailsById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM order_details WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    })
}
  
exports.createOrderDetails = (req, res) => {
    const { id, user_id, total, payment_id } = req.body
    db.query('INSERT INTO order_details (id, user_id, total, payment_id) VALUES ($1, $2, $3, $4)', [id, user_id, total, payment_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`Order Details created`)
    })
}

exports.updateOrderDetails = (req, res) => {
    const id = req.params.id;
    const { user_id, total, payment_id } = req.body
    db.query(
      'UPDATE order_details SET user_id = $1, total = $2, payment_id = $3 WHERE id = $4',
      [user_id, total, payment_id, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Order Details modified with ID: ${id}`)
      })
}
  
exports.deleteOrderDetails = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM order_details WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Order Details deleted with ID: ${id}`)
    })
}