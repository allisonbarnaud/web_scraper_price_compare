const express = require('express')
const router = express.Router()
const scraperJb = require('../helpers/web_scraper_jb.js')
const scraperHn = require('../helpers/web_scraper.js')
const { request } = require('express')


async function scrapeProductsByWebsite(req, res) {
    console.log(req.query.website)
    console.log(req.query.product_url)
    if (req.query.website === 'jb' || req.query.website === 'hn' ) {
        let productJb = await scraperJb.scrapeProductJB(req.query.product_urlJB)
        let productHn = await scraperHn.HNProductScrape(req.query.product_urlHN)
        res
            .status(200)
            .json({message: 'valid request', data: {'jb': productJb, 'hn': productHn} })
    // } else if (req.query.website === 'hn') {
    //     let productHn = await scraperHn.HNProductScrape(req.query.product_url)
    //     res
    //         .status(200)
    //         .json({message: 'valid request', data: {'hn': productHn} })
    } else {
        res
        .status(404)
        .json({message: 'website not supported'})
    }
}

async function searchProductsKW(req, res) {
    console.log(req.query.keyword)
    const hnUrl = `https://www.harveynorman.com.au/catalogsearch/result/?q=${req.query.keyword}`
    const jbUrl = `https://www.jbhifi.com.au/?q=${req.query.keyword}`
    let searchResultsJb = await scraperJb.scrapeSearchJB(jbUrl)
    let searchResultsHn = await scraperHn.HNUrlScrape(hnUrl)
    res
        .status(200)
        .json({message: 'valid request',  data: {'jb': searchResultsJb, 'hn': searchResultsHn}})
}

router.get('/products', scrapeProductsByWebsite)
router.get('/search', searchProductsKW)


module.exports = router