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
  async init() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS homes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        price NUMERIC(12, 2) NOT NULL,
        bedrooms INTEGER NOT NULL DEFAULT 0,
        bathrooms INTEGER NOT NULL DEFAULT 0,
        images JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS update_homes_updated_at ON homes;

      CREATE TRIGGER update_homes_updated_at
      BEFORE UPDATE ON homes
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  },
};
