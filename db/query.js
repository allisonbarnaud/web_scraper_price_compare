const { Pool } = require('pg')
const pool = new Pool({ database: 'scraper_app' })

module.exports = {
  query: (sql, params, callback) => pool.query(sql, params, callback),
}