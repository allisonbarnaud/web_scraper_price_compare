const puppeteer = require('puppeteer')

async function scrapeProductJB(url) {
    // launch puppeteer browser
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // get product name
    const el = await page.$('.product-overview h1');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    // get product price and discount 
        // variable declaration
    const el2 = await page.$('.product-cta .simple .price');
    const el3 = await page.$('.sale');
    const el7 = await page.$('.sale-label');

    // get the product price
    if (el2 === null || el2 === undefined) {
        var cost = await el3.getProperty('textContent');
        var sale = await cost.jsonValue();
        var price = parseFloat(sale.split('\n')[0].replace(/\$/g, ''));
    } else {
        var cost = await el2.getProperty('textContent');
        var newPrice = await cost.jsonValue();
        var price = parseFloat(newPrice.replace(/\$/g, ''));
    }

    // get the discount
    if (el7 === null || el7 === undefined) {
        var discount = 0;
    } else {
        var discountSale = await el7.getProperty('textContent');
        var discounted = await discountSale.jsonValue();
        var discount = parseFloat(discounted.split(' ')[0].replace(/\$/g, ''));
    }

    // get product image
    const el4 = await page.$('.product-images > div.product-single__photos > div.slick-initialized.slick-slider > div > div > figure.slick-slide.slick-current.slick-active > a');
    const src = await el4.getProperty('href');
    const img = await src.jsonValue();

    // get product rating 
    const el5 = await page.$('.star-review .review-rating')
    if (el5 === null || el5 === undefined) {
        var rating = null
    } else {
        const ratingText = await el5.getProperty('textContent');
        var newRating = await ratingText.jsonValue();
        var rating = parseFloat(newRating);
    }

    // get product category
    const [el6] = await page.$x('//*[@id="PageContainer"]/div/ol/li[2]/span')
    const [el9] = await page.$x('//*[@id="PageContainer"]/div/ol/li[3]/a')
    if (el6 === null || el6 === undefined) {
        const categoryText = await el9.getProperty('textContent')
        var category = await categoryText.jsonValue()
    } else {
        const categoryText = await el6.getProperty('textContent')
        var category = await categoryText.jsonValue()
    }

    // close browser
    browser.close();

    return {name, img, price, discount, rating, category};
};

// scrapeProductJB('https://www.jbhifi.com.au/products/apple-airpods-pro');

async function scrapeSearchJB(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    
    const links = [];
    const el = await page.$$('.ais-details-a');

    for (const [index, element] of el.entries()) {
        const text = await element.getProperty('href');
        const name = await text.jsonValue();
        links.push(name);
        if (index == el.length -1){
            browser.close();
            return links;
        };
    };
};

// scrapeSearchJB('https://www.jbhifi.com.au/?q=macbook&hPP=36&idx=shopify_products&p=0')

module.exports = {
    scrapeProductJB,
    scrapeSearchJB
}