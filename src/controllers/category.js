const db = require('../config/db.js');

exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM category', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM category WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.createCategory = (req, res) => {
  const { id, name, description } = req.body
  db.query('INSERT INTO category (id, name, description) VALUES ($1, $2, $3)', [id, name, description], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Category created`)
  })
}

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body
  db.query(
    'UPDATE category SET name = $1, description = $2 WHERE id = $3',
    [name, description, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Category modified with ID: ${id}`)
    }
  )
}

exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM category WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Category deleted with ID: ${id}`)
  })
}