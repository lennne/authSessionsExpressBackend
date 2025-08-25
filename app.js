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
mongoose.connect(uri, {'dbName': 'customerDB'})

// Starting the server and listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})
