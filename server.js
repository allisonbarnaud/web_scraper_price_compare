const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const logger = require('./helpers/logger.js')
const websites = require('./api/websites.js')
const products = require('./api/products.js')
const categories = require('./api/categories.js')
const data = require('./api/data.js')



app.use(logger)
app.use(express.static('client'))
app.use(bodyParser.json())


app.use('/api/websites', websites)
app.use('/api/products', products)
app.use('/api/categories', categories)
app.use('/api/data', data)
// routes

app.get('/api/products', (req, res) => {
    res.send('laptops page')
})

// app.get('/smartphones.html', (req, res) => {
//     res.send(`phones page ${findAllProducts()}`)
// })





app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})