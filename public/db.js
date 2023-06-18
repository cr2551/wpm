// const nodeFetch = require('node-fetch');
const axios = require('axios');
const { response } = require('express');

let number = '5';  // cannot be int to be processed by axios

// modify test db by sending values to it via post request
// nodeFetch('localhost:8080/submit', {
//     method: 'POST',
//     headers: {'Content-Type': 'text/plain'},
//     body: number

// })
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error("foudn error", error);
// });





axios.post('http://localhost:8080/submit', number)
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error("error encountered: ", error);
})
