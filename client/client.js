console.log('welcome to client side');

const userForm = document.querySelector('.user-form');
const userInput = document.querySelector('.user-input');
const submitBtn = document.querySelector('.submit-btn');
const laptops = document.querySelector('.laptops');
const smartphones = document.querySelector('.smartphones');
const monitors = document.querySelector('.monitors');
const printers = document.querySelector('.printers');
const list = document.querySelector('.list')
const jb = document.querySelector('.jb')
const hn = document.querySelector('.hn')

const productList = document.querySelector('.productList');

const productImg = document.querySelector('.product-img')



// axios.get("http://localhost:8080/api/products").then(res => {
//     console.log(res.data.data[0])
// })

var HNurlAr = []
var HNimgAr = []
//make a request from the frontend to the scraper api
function scraperSearch(event) {
    event.preventDefault()

    axios
        .get("/api/scraper/search", { params: {keyword: userInput.value }})
        
        .then(res => {
            console.log(res.data.data)
            HNurlAr = res.data.data.hn[0]
            HNimgAr = res.data.data.hn[2]
            res.data.data.hn[1].forEach((item, index) => {
                let li = document.createElement('li')
                list.appendChild(li)
                li.textContent = item
                li.dataset.indexNumber = index
                li.addEventListener('click', scraperProduct)

                let img = document.createElement('img')
                list.appendChild(img)
                img.src = res.data.data.hn[2][index]
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
                        console.log(res.data.data)
                        jb.textContent = `name: ${res.data.data.jb.name}, price at JBHIFI: ${res.data.data.jb.price}` 
                        hn.textContent = `name: ${res.data.data.hn.name}, price at Harvey Norman: ${res.data.data.hn.price}` 
                        productImg.src = HNimgAr[event.target.dataset.indexNumber]
                    }
                )}
        )
}

submitBtn.addEventListener('click', scraperSearch)

