const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const logger = require('./helpers/logger.js')
const scraper = require('./api/scraperApi.js')



app.use(logger)
app.use(express.static('client'))
app.use(bodyParser.json())


app.use('/api/scraper', scraper)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})