console.log('welcome to client side');

const userForm = document.querySelector('.user-form');
const userInput = document.querySelector('.userinput');
const submitBtn = document.querySelector('.submit-btn');
const laptops = document.querySelector('.laptops');
const smartphones = document.querySelector('.smartphones');
const monitors = document.querySelector('.monitors');
const printers = document.querySelector('.printers');



axios.get("http://localhost:8080/api/products").then(res => {
    console.log(res.data.data[0])
})