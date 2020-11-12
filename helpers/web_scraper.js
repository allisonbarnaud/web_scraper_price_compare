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

var done = false

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

        innerScrape(productUrl)

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

    const el = await page.$('.price');
    const text = await el.getProperty('textContent');
    const price = await text.jsonValue();

    console.log(price)
}

scrape('https://www.harveynorman.com.au/catalogsearch/result/?q=macbook')



