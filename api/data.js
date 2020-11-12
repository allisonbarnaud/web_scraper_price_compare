const express = require('express')
const router = express.Router()
const db = require('../db/query.js')

const findAllData = (req, res) => {
    const sql = 'SELECT * FROM product_data;'
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

const findDataById = (req, res) => {
    const sql = 'SELECT * FROM product_data WHERE id = $1;'
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

const findDataByWebsiteId = (req, res) => {
    const sql = 'SELECT * FROM product_data WHERE website_id = $1;'
    db.query(sql, [req.body.website_id], (err, db) => {
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

const findDataByProductId = (req, res) => {
    const sql = 'SELECT * FROM product_data WHERE product_id = $1;'
    db.query(sql, [req.body.product_id], (err, db) => {
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

const findDataByCategoryId = (req, res) => {
    const sql = 'SELECT * FROM product_data WHERE category_id = $1;'
    db.query(sql, [req.body.category_id], (err, db) => {
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


router.get('/', findAllData)
router.get('/id', findDataById)
router.get('/website', findDataByWebsiteId)
router.get('/product', findDataByProductId)
router.get('/category', findDataByCategoryId)

module.exports = router