const express = require('express')
const router = express.Router()
const db = require('../db/query.js')

const findAllWebsites = (req, res) => {
    const sql = 'SELECT * FROM websites;'
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

const findWebsitesById = (req, res) => {
    const sql = 'SELECT * FROM websites WHERE id = $1;'
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

router.get('/', findAllWebsites)
router.get('/id', findWebsitesById)

module.exports = router