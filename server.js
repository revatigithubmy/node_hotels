const express = require('express')
const app = express()
const db= require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('Welcome to my hotel... How i can help you?, we have list of menus')
})


//Import the router files
const personRoutes = require('./routes/personRoutes');
//use the router
app.use('/person',personRoutes);


const menuRoutes = require('./routes/menuRoutes');
//use the router
app.use('/MenuItem',menuRoutes);



app.listen(3000,()=>{
  console.log('Listening on port 3000');
})