const express = require('express')
const router = express.Router()
const scraperJb = require('../helpers/web_scraper_jb.js')
const scraperHn = require('../helpers/web_scraper.js')


async function scrapeProductsByWebsite(req, res) {
    if (req.body.website === 'jb') {
        let productJb = await scraperJb.scrapeProductJB(req.body.product_url)
        res
            .status(200)
            .json({message: 'valid request', data: {'jb': productJb} })
    } else if (req.body.website === 'hn') {
        let productHn = await scraperHn.HNProductScrape(req.body.product_url)
        res
            .status(200)
            .json({message: 'valid request', data: {'hn': productHn} })
    } else {
        res
        .status(404)
        .json({message: 'website not supported'})

    }
}

async function searchProductsKW(req, res) {
    const hnUrl = `https://www.harveynorman.com.au/catalogsearch/result/?q=${req.body.keyword}`
    const jbUrl = `https://www.jbhifi.com.au/?q=${req.body.keyword}`
    let searchResultsJb = await scraperJb.scrapeSearchJB(jbUrl)
    let searchResultsHn = await scraperHn.HNUrlScrape(hnUrl)
    res
        .status(200)
        .json({message: 'valid request',  data: {'jb': searchResultsJb, 'hn': searchResultsHn}})
}

router.get('/products', scrapeProductsByWebsite)
router.get('/search', searchProductsKW)


module.exports = router