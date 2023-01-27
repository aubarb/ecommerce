const { Pool } = require('pg')

const pool = new Pool({
    user: 'aurele',
    host: 'localhost',
    database: 'ECOM',
    password: 'password',
    port: 5432,
})

module.exports = pool;
