

console.log('data page');


function getData(product) {
    let li = document.createElement('li')
    li.setAttribute('data-id', product.id)
    li.innerHTML = `${product.listed_name}`
    return li
}

function renderItems() {
    const url = 'http://localhost:8080/api/data'
    axios.get(url).then(res => {
        res.data.data.forEach(product => {
            ul.appendChild(getData(product))
        })
    })
}
renderItems()



const ul = document.querySelector('ul')
