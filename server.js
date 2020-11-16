const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4567
const logger = require('./helpers/logger.js')
const scraper = require('./api/scraperApi.js')
const popularSearches = require('./api/popularSearches.js')

app.use(logger)
app.use(express.static('client'))
app.use(bodyParser.json())


app.use('/api/scraper', scraper)
app.use('/api/searches', popularSearches)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})