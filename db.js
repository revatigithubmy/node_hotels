const mongoose = require('mongoose');
require('dotenv').config();
//define the MongoDB connection URL
//const mongoURL = 'mongodb://localhost:27017/hotels'// Replace 'hotel' with your database name
const mongoURL =process.env.MONGODB_URL;

//set up mongodb connection
mongoose.connect(mongoURL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

mongoose.connect(mongoURL, {
  ssl: true,
  tlsAllowInvalidCertificates: false, // Only for development/testing
  // Other options...
});

//get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listeners for database connection

db.on('connected',()=>{
  console.log('Connected to MongoDB server');
});

db.on('error',(err)=>{
  console.log('MongoDB connection error',err);
});

db.on('disconnected',()=>{
  console.log('MongoDB disconnected');
});

//export the database connection
module.exports = db;
