const mongoose = require('mongoose');
const Customers = require('./customer');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
//we iinstall and import bcrypt for hashing and storing passwords securely
const bcrypt = require('bcrypt');
//to store passwords we need to create salts - extra random data to add to the passwords
const saltRounds = 5;
const password = "admin";

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

app.post('/api/login', async (req, res) => {
    const data = req.body;
    console.log(data);
    let user_name = data['user_name'];
    let password = data['password'];

    //Querying the mongoDB 'customers' collection for matching user_name and password
    const documents = await Customers.find({user_name: user_name});

    //if a matching user is found, set the session username and serve the home page
    if(documents.length > 0){
        let result = await bcrypt.compare(password, documents[0]['password']);
        if(true){
            res.send("User logged in");
        }else{
            res.send("Incorrect Information! Try again")
        }
    }else{
        res.send("User Information incorrect");
    }
});

app.post('/api/customer', async(req, res) => {
    const data = req.body;

    const documents = await Customers.find({user_name: data['user_name']})
    if(documents.lenth > 0){
        res.send("User already exists");
    }

    //Create a hashed password
    let hashedpwd = bcrypt.hashSync(data['password'], saltRounds);

    //Creating a new instance of the Customers model with data from the request
    const customer = new Customers({
        "user_name": data['user_name'],
        "age": data['age'],
        "password": hashedpwd,
        "email": data['email']
    });

    //Saving the new customer to the MongoDB 'customers' collection
    await customer.save();

    res.send("Customer saved successfully");
});

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
})

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});