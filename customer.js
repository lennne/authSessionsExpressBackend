//importing the mongoose library which is the ODM library for MongoDBs
const mongoose = require('mongoose');

//Creating a schema using the 'Schema' class from mongoose.
const Schema = mongoose.Schema;

//Defining a Schema for the 'customers' collection in MongoDB
const customersSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    //Field for storing the user's password as a String
    password: {
        type: String,
        required: true
    },
    //Field for storing the user's email address as a String
    email: {
        type: String, 
        required: true
    },
    //Field for storing the user's age as a number
    age: {
        type: Number,
        required: true //
    }
});

// Creating a model from the Schema. This model will represent the 'customers' collection in MongoDB.
// The first argument is the name of the collection and the second argument is the schema.s
const CustomerModel = mongoose.model('customers', customersSchema )
//Exporting the CustomerModel 

module.exports = CustomerModel