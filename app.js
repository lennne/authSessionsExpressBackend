const mongoose = require('mongoose');
const Customers = require('./customer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();
//an instance of the express application
const app = express();

const port = 3000;

//MongoDB  connection URI and databasename
const uri = process.env.MONGO_DB;
mongoose.connect(uri, {'dbName': 'customerDB'});

//Middleware to pares JSON data
app.use(bodyParser.json())

//Serving static files from the 'frontend' directory under the '/static' routes
app.use('/static', express.static(path.join(".", 'frontend')));

//Middleware to handle URL encoded form data
// URL sEncoding replaces unsafe characters with:
// % + [two-digit hexadecimal code of the character in ASCII/UTF-8]
// Examples:
// Space " " → %20
app.use(bodyParser.urlencoded({ extended: true}))

app.post('/api/login', async () => {
    const data = req.body;
    console.log(data);
    let user_name = data['user_name'];
    let password = data['password'];

    //Querying the mongoDB 'customers' collection for matching user_name and password
    const documents = await Customers.find({user_name: user_name, password: password});

    //if a matching user is found, set the session username and serve the home page
    if(documents.length > 0){
        res.send("User logged In");
    }else{
        res.send("User Information incorrect");
    }


});

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});