const axios = require('axios').default;

import { parse } from 'node-html-parser';

const HTMLParser = require('node-html-parser');

axios.get('https://www.jbhifi.com.au/products/apple-macbook-air-13-inch-with-m1-chip-7-core-gpu-256gb-ssd-space-grey-2020').then(res => {
    console.log(HTMLparser.parse(res.data))
})

const puppeteer = require('puppeteer')

async function scrape(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const el = await page.$('.product-overview h1');
    const text = await el.getProperty('textContent');
    const name = await text.jsonValue();

    const [el2] = await page.$x('//*[@id="ProductSection-"]/div/div[1]/div/div[1]/div[2]/div[1]/div/div/figure[2]/a/img');
    const src = await el2.getProperty('src');
    const image = await src.jsonValue();

    const [el3] = await page.$x('//*[@id="ProductSection-"]/div/div[2]/div[1]/div[1]/div/span');
    const cost = await el3.getProperty('textContent');
    const price = await cost.jsonValue();

    browser.close()

    console.log({name, price, image})

    return {name, price, image}
}

scrape('https://www.jbhifi.com.au/products/apple-macbook-pro-13-inch-2-0ghz-i5-512gb-silver-2020')