const express = require('express')
const router = express.Router()
const db = require('../db/query.js')

const createSearch = (req, res) => {
    const sql = 'INSERT INTO searches (keyword) VALUES ($1);'
    db.query(sql, [req.body.keyword.toLowerCase()], (err, db) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: 'invalid request', 
                    error: err.message
                })        
        } else {
            if (db.rowCount > 0) {
                res
                    .status(200)
                    .json({
                        message: `Success. ${db.rowCount} inserted into searches`
                    })
            } else {
                res
                    .status(404)
                    .json({
                        message: 'no records inserted.'
                    })
            }
        }
    })
}

const findPopularSearches = (req, res) => {
    const sql = `SELECT keyword,
                        COUNT(keyword) AS num_searches
                   FROM searches
                  GROUP BY keyword
                  ORDER BY num_searches DESC;
                `
    db.query(sql, [], (err, db) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: 'invalid request', 
                    error: err.message
                })
        } else {
            if (db.rowCount > 0) {
                res
                    .status(200)
                    .json({
                        message: 'valid request', 
                        data: {
                            "searches": db.rows.map(search => search.keyword),
                            "searchesCount": db.rows
                        }
                    })
            } else {
                res
                    .status(404)
                    .json({
                        message: 'no records found'
                    })
            } 
        }
    })
}

const findPopularSearchesLimit = (req, res) => {
    const sql = `SELECT keyword,
                        COUNT(keyword) AS num_searches
                   FROM searches
                  GROUP BY keyword
                  ORDER BY num_searches DESC
                  LIMIT $1;
                `
    db.query(sql, [req.query.limit], (err, db) => {
        if (err) {
            res
                .status(400)
                .json({
                    message: 'invalid request', 
                    error: err.message
                })
        } else {
            if (db.rowCount > 0) {
                res
                    .status(200)
                    .json({
                        message: 'valid request', 
                        data: {
                            "searches": db.rows.map(search => search.keyword),
                            "searchesCount": db.rows
                        }
                    })
            } else {
                res
                    .status(404)
                    .json({
                        message: 'no records found'
                    })
            } 
        }
    })
}

router.post('/', createSearch)
router.get('/', findPopularSearches)
router.get('/limit', findPopularSearchesLimit)

module.exports = router