console.log('welcome to client side');

const userForm = document.querySelector('.user-form');
const userInput = document.querySelector('.user-input');
const submitBtn = document.querySelector('.submit-btn');
const list = document.querySelector('.list')
const jb = document.querySelector('.jb')
const hn = document.querySelector('.hn')
const jbName = document.querySelector('.jb-name')
const hnName = document.querySelector('.hn-name')
const jbPrice = document.querySelector('.jb-price')
const hnPrice = document.querySelector('.hn-price')
const jbRating = document.querySelector('.jb-rating')
const hnRating = document.querySelector('.hn-rating')
const jbCategory = document.querySelector('.jb-category')
const hnCategory = document.querySelector('.hn-category')
const productList = document.querySelector('.productList');
const jbProductImg = document.querySelector('.jb-product-img');
const hnProductImg = document.querySelector('.hn-product-img');
const jbDiscount = document.querySelector('.jb-discount');
const hnDiscount = document.querySelector('.hn-discount');
const loader = document.querySelector('.loader');
const container = document.querySelector('.container');

var HNurlAr = []
var HNimgAr = []

const renderPopularSearches = () => {
    axios
        .get("/api/searches/limit", { params: { limit: 4 }})
        .then(search => {
            let searches = search.data.data.searches
            searches.forEach(keyword => {
                let btn = document.createElement('button')
                btn.textContent = keyword
                btn.classList.add('popular-search')
                popularSearches.appendChild(btn)
            })
        })
}

//make a request from the frontend to the scraper api
function scraperSearch(event) {
    event.preventDefault();
    loader.classList.add('loading');
    let keyword = event.target.classList.contains('submit-btn') ? userInput.value : event.target.textContent
    axios
        .get("/api/scraper/search", { params: {keyword: keyword }})
        
        .then(res => {
            axios.post("/api/searches", {keyword: keyword})
            console.log(res.data.data)
            HNurlAr = res.data.data.hn[0]
            HNimgAr = res.data.data.hn[2]
            res.data.data.hn[1].forEach((item, index) => {
                let div = document.createElement('div')
                let li = document.createElement('li')
                list.appendChild(div)
                div.appendChild(li)
                li.textContent = item
                li.dataset.indexNumber = index
                li.addEventListener('click', scraperProduct)

                let img = document.createElement('img')
                div.appendChild(img)
                img.src = res.data.data.hn[2][index]
                loader.classList.remove('loading');
            })     
        })
}

function scraperProduct(event) {
    event.preventDefault()
    let searchTerm = event.target.textContent
    axios
        .get("/api/scraper/search", { params: {keyword: searchTerm }})
        .then(res => {
            var jbURL = res.data.data.jb[0]
            var hnURL = HNurlAr[event.target.dataset.indexNumber]
            
                axios
                    .get("/api/scraper/products", { params: {product_urlHN: hnURL, product_urlJB: jbURL, website: "hn"}})
                    .then(res => {
                        console.log(res.data.data);
                        jb.textContent = `Retailer: JB Hi Fi`;
                        jbName.textContent = `Name: ${res.data.data.jb.name}`;
                        jbPrice.textContent = `Price: $${res.data.data.jb.price}`;
                        jbDiscount.textContent = `Discount: $${res.data.data.jb.discount}`;
                        jbRating.textContent = `Rating: ${res.data.data.jb.rating}`;
                        jbCategory.textContent = `Category: ${res.data.data.jb.category}`;
                        jbProductImg.src = res.data.data.jb.img;

                        hn.textContent = `Retailer: Harvey Norman`;
                        hnName.textContent = `Name: ${res.data.data.hn.name}`;
                        hnPrice.textContent = `Price: $${res.data.data.hn.price}`; 
                        hnDiscount.textContent = `Discount: $${res.data.data.hn.discount}`;
                        hnRating.textContent = `Rating: ${res.data.data.hn.rating}`;
                        hnCategory.textContent = `Category: ${res.data.data.hn.category}`;
                        hnProductImg.src = HNimgAr[event.target.dataset.indexNumber];
                    }
                )}
        )
}

renderPopularSearches();

submitBtn.addEventListener('click', scraperSearch);
container.addEventListener('click', scraperSearch);