const db = require('../config/db.js');

exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM product', (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

exports.getProductById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM product WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
}

exports.createProduct = (req, res) => {
    const {id, name, price, description, sku, quantity, image_url, category_id} = req.body
    db.query('INSERT INTO product (id, name, price,	description, sku, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [id, name, price,	description, sku, quantity, image_url, category_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send('Product Created!')
    } )
}

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const {name, price, description, sku, quantity, image_url, category_id} = req.body
    db.query(
        'UPDATE product SET name =$1, price = $2, description = $3, sku = $4, quantity = $5, image_url = $6, category_id = $7 WHERE id = $8',
        [name, price, description, sku, quantity, image_url, category_id, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Product with ID: ${id} modified`);
        })
}

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM product WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Product with id: ${id} deleted`)
    })
}