const puppeteer = require('puppeteer')

const axios = require('axios')

// async function scrape(url) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url)

//     const el = await page.$('.product-overview h1');
//     const text = await el.getProperty('textContent');
//     const name = await text.jsonValue();

//     const [el2] = await page.$x('//*[@id="ProductSection-"]/div/div[1]/div/div[1]/div[2]/div[1]/div/div/figure[2]/a/img');
//     const src = await el2.getProperty('src');
//     const image = await src.jsonValue();

//     const [el3] = await page.$x('//*[@id="ProductSection-"]/div/div[2]/div[1]/div[1]/div/span');
//     const cost = await el3.getProperty('textContent');
//     const price = await cost.jsonValue();

//     browser.close()

//     console.log({name, price, image})

//     return {name, price, image}
// }

// scrape('https://www.jbhifi.com.au/products/apple-macbook-pro-13-inch-2-0ghz-i5-512gb-silver-2020')

// axios.get('https://www.jbhifi.com.au/products/apple-macbook-pro-13-inch-2-0ghz-i5-512gb-silver-2020.js').then(res => {console.log(res.data)})

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

async function innerScrape(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const el = await page.$('.product-name')
    const text = await el.getProperty('textContent')
    const name = await text.jsonValue()

    const el2 = await page.$('.hn-carousel-embed-container img')
    const text2 = await el2.getProperty('src')
    const img = await text2.jsonValue()

    // const price2 = await page.$eval('#product-view-price', value => value.dataset.price)
    const el4 = await page.$x('/html/body/div[1]/div/div[6]/div/div[1]/div/div[2]/div[3]/div/form/div[2]/div[2]/div[1]/div/div/span[1]/span[2]');
    const el3 = await page.$x('/html/body/div[1]/div/div[6]/div/div[1]/div/div[2]/div[3]/div/form/div[2]/div[2]/div[1]/div/span/span');
    if (el3 == null) {
        var text3 = await el4.getProperty('textContent');
        var price = await text3.jsonValue();
    } else {
        var text3 = await el3.getProperty('textContent');
        var price = await text3.jsonValue();
    }
    
    const el5 = await page.$('#product-view-price > div:nth-child(1) > div > div > span.special-text.label.label_important.label_bubble.p_txt-upper');
    if (el5 == null) {
        var discount = 0
    } else {
        var text4 = await el5.getProperty('textContent');
        var discount = await text4.jsonValue(); 
    }
    
    var rating = await page.$eval('#overview > div.col-xs-12.col-sm-7.col-md-8 > div > div > div > div > div > div > div > div > dl > dd.bv-rating-ratio', value => value.title)

    rating = rating.split(' ')[0]

    browser.close()
    console.log({name, img, price, discount, rating})
}

scrape('https://www.harveynorman.com.au/catalogsearch/result/?q=macbook')

innerScrape('https://www.harveynorman.com.au/sennheiser-pxc-550-ii-wireless-over-ear-headphones.html')



