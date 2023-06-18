// const http = require('node:http')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mysql = require('mysql2');


const app = express();


app.use(express.json());  // this one is needed for json objects, remember to use the correct Content-Type: application/json
// and to do JSON.stringify(object) value part of the body key.
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.text()) // this is needed to read text data sent in a post req

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/submit', (req, res) => {
    const value = req.body;
    console.log("the value is: ", value);
    console.log(typeof value) // returns string when i pass an int in 
    // const query = `INSERT INTO test VALUES ('${value}')`;
    // connection.query(query, (error, results, fields) => {
    //     if (error) throw error;
    //     console.log("wrote value: ", value); 
    // })
    // res.send("post request succesful");
    // res.send("you sent the value", value);
    res.send({message: "hello, this is a message from the post request"});
});



const port = 8080;
app.listen(port, () => {
    console.log("server is running on port", port);
});





// // Database stuff
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'dev',
//     password: '',
//     database: 'wpm'
// });

// // let query = "INSERT INTO test VALUES (1)";


// query = "SELECT * FROM test";
// connection.query(query, (error, results, fields) => {
//     if (error) throw error;
//     console.log("table test looks like this:\n", results);
// });

// process.on('SIGINT', () => {
//     connection.end((err) => {
//       if (err) {
//         console.error('Error closing database connection:', err);
//       }
//       console.log('Database connection closed');
//       process.exit();
//     });
//   });
