const express = require('express')
const router = express.Router()
const db = require('../db/query.js')

const findAllCategories = (req, res) => {
    const sql = 'SELECT * FROM categories;'
    db.query(sql, [], (err, db) => {
        if (err) {
            res.status(400).json({message: 'invalid request', error: err.message})
        } else {
            if (db.rowCount > 0) {
                res.status(200).json({message: 'valid request', data: db.rows})
            } else {
                res.status(404).json({message: 'no records found'})
            } 
        }
    })
}

const findCategoriesById = (req, res) => {
    const sql = 'SELECT * FROM categories WHERE id = $1;'
    db.query(sql, [req.body.id], (err, db) => {
        if (err) {
            res.status(400).json({message: 'invalid request', error: err.message}) 
        } else {
            if (db.rowCount > 0) {
                res.status(200).json({message: 'valid request', data: db.rows})
            } else {
                res.status(404).json({message: 'no records found'})
            } 
        }
    })
}

const findCategoriesByKeyword = (req, res) => {
    const sql = 'SELECT * FROM categories WHERE name ILIKE $1;'
    db.query(sql, [`%${req.body.keyword}%`], (err, db) => {
        if (err) {
            res.status(400).json({message: 'invalid request', error: err.message, sql: sql}) 
        } else {
            if (db.rowCount > 0) {
                res.status(200).json({message: 'valid request', data: db.rows})
            } else {
                res.status(404).json({message: 'no records found'})
            } 
        }
    })
}


router.get('/', findAllCategories)
router.get('/id', findCategoriesById)
router.get('/keyword', findCategoriesByKeyword)

module.exports = router