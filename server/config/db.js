require("dotenv").config({ path: ".env.production" });
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;

/* require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
}); */
