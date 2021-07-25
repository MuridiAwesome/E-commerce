const { Pool } = require('pg');

const pool = new Pool({
  user: 'Muridi',
  host: 'localhost',
  port: 5432,
  database: 'E-Commerce'
});

module.exports = pool;
