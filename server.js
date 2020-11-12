const express = require('express')
const app = express()
const port = 8080
const logger = require('./helpers/logger.js')

app.use(logger)
app.use(express.static('client'))


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})