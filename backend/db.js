const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  host: process.env.DB_HOST || process.env.POSTGRES_HOST,
  user: process.env.DB_USER || process.env.POSTGRES_USER,
  password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME || process.env.POSTGRES_DATABASE,
  port: Number(process.env.DB_PORT || process.env.POSTGRES_PORT || 5432),
  ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
});

function toPostgresQuery(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

module.exports = {
  async query(sql, params = []) {
    const result = await pool.query(toPostgresQuery(sql), params);
    return [result.rows, result];
  },
};
