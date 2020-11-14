const puppeteer = require('puppeteer')

// find and grab all product page url's for queried item
async function HNUrlScrape(url) {
    var urlArr = []
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const el = await page.$$('.product-item .product-info-item .info a');

    for (const [index, element] of el.entries()) {
        
        const text = await element.getProperty('href');
        const productUrl = await text.jsonValue();

        urlArr.push(productUrl)

        if (index == el.length-1){
            browser.close()
            console.log(urlArr)
        }
    } 
}

// find and grab all required information to compare
async function HNProductScrape(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    //grabs name of product
    const el = await page.$('.product-name')
    const text = await el.getProperty('textContent')
    const name = await text.jsonValue()

    //grabs image of product
    const el2 = await page.$('.hn-carousel-embed-container img')
    const text2 = await el2.getProperty('src')
    const img = await text2.jsonValue()

    //grabs price of product
    var price = await page.$eval('#product-view-price', value => value.dataset.price)
    price = Math.round(parseFloat(price))
    
    //grabs discount value of product, defaults to 0
    const el5 = await page.$('#product-view-price > div:nth-child(1) > div > div > span.special-text.label.label_important.label_bubble.p_txt-upper');
    if (el5 == null) {
        var discount = 0
    } else {
        var text4 = await el5.getProperty('textContent');
        var discount = await text4.jsonValue(); 

        discount = discount.split(' ')[1]
        discount = parseFloat(discount.slice(1))
    }

    const el6 = await page.$('#breadcrumbs > li:nth-child(6) > a')
    const text5 = await el6.getProperty('textContent')
    const category = await text5.jsonValue()
    

    //grabs rating of product
    var rating = await page.$eval('#overview > div.col-xs-12.col-sm-7.col-md-8 > div > div > div > div > div > div > div > div > dl > dd.bv-rating-ratio', value => value.title)

    rating = rating.split(' ')[0]
    rating = parseFloat(rating)
    
    //close connection request and displays information
    browser.close()
    HNProductInfo = {name, img, price, discount, rating, category}
    console.log(HNProductInfo)
}


HNUrlScrape('https://www.harveynorman.com.au/catalogsearch/result/?q=macbook')

HNProductScrape('https://www.harveynorman.com.au/logitech-mx-master-3-wireless-mouse-graphite.html')