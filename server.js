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
    const receivedValue = req.body;  // when you send an object you get an objet back
    // convert
//     const parsedValue = JSON.parse(req.body);
//    console.log(parsedValue); 
    console.log("the value is: ", receivedValue);
    console.log(typeof receivedValue) // returns string when i pass an int in from fetch post request
   
   const wpm = receivedValue.wpm;
   const accuracy = receivedValue.accuracy;
   
    let query = `INSERT INTO test VALUES ('${wpm}', '${accuracy}')`;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log("wrote value: ", typeof wpm); 
    });

    query = "SELECT * FROM test";
    let queryResults;
    connection.query(query, (error, results, fields) => {
    if (error) throw error;
    // the next line is not working figure out how to save the results for use outside this func
    queryResults = results;
    console.log("table test looks like this:\n", results);
    });

    res.send({message: "hello, this is a message from the post request", 'receivedValue': receivedValue, 
        'results': queryResults, 'type': typeof queryResults});
});



app.post('/query', (req, res) => {
    let query = req.body.queryKey;
    console.log(query);
    connection.query(query, (error, results) => {
        if (error) throw error;
        console.log(results);
    });
    res.send({message: "query was executed"});
    // res.send(500);  //it seems it cannot send a number, but it can send strings, and objects. if you send a number it thinks you are setting a status code
});








const port = 8080;
app.listen(port, () => {
    console.log("server is running on port", port);
});





// // Database stuff
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: '',
    database: 'wpm'
});




process.on('SIGINT', () => {
    connection.end((err) => {
      if (err) {
        console.error('Error closing database connection:', err);
      }
      console.log('Database connection closed');
      process.exit();
    });
  });
