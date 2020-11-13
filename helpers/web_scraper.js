const puppeteer = require('puppeteer')

// find and grab all product page url's for queried item
async function scrape(url) {
    var arr = []
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const el = await page.$$('.product-item .product-info-item .info a');
    el.forEach(async (element, index) =>  {
        
        const text = await element.getProperty('href');
        const productUrl = await text.jsonValue();

        arr.push(productUrl)

        if (index == el.length-1){
            browser.close()
            console.log(arr)
        }
    })   
}

// find and grab all required information to compare
async function innerScrape(url) {
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

    
    

    //grabs rating of product
    var rating = await page.$eval('#overview > div.col-xs-12.col-sm-7.col-md-8 > div > div > div > div > div > div > div > div > dl > dd.bv-rating-ratio', value => value.title)

    rating = rating.split(' ')[0]
    rating = parseFloat(rating)
    
    //close connection request and displays information
    browser.close()
    console.log({name, img, price, discount, rating})
}

// scrape('https://www.harveynorman.com.au/catalogsearch/result/?q=macbook')

innerScrape('https://www.harveynorman.com.au/lenovo-ideapad-14-inch-i5-1035g1-8gb-256gb-ssd-laptop.html')