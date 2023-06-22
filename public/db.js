// use this file to test sql db functionality.

const axios = require('axios');
// const { response, query } = require('express');

if (false) {
    let number = {number: 7};

    axios.post('http://localhost:8080/submit', number)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("error encountered: ", error);
    });
}


// query the database from here:
let table = "test";
let describe = `describe ${table}`;
let showTb = "SELECT * FROM test";
let insert = "INSERT INTO test (id, average) VALUES (4, 8)";


queryObject = {queryKey: describe};

if (true) {
    axios.post('http://localhost:8080/query', queryObject)
    .then(response => {
        console.log(response.data);
        // console.log(typeof response.data)
    })
    .catch(error => {
        // if it returns an error, it is of type object
        console.error("the following error was found:", error)
    });
}

