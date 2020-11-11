const axios = require('axios').default;

import { parse } from 'node-html-parser';

const HTMLParser = require('node-html-parser');

axios.get('https://www.jbhifi.com.au/products/apple-macbook-air-13-inch-with-m1-chip-7-core-gpu-256gb-ssd-space-grey-2020').then(res => {
    console.log(HTMLparser.parse(res.data))
})

