const express = require('express');
const app = express();  

const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const db = require('./api/models/database.js'); 

const userRoutes = require('./api/routes/users');

//Test Database Connection
db.connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected Successfully!");
  });

app.use((req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if(req.method == 'OPTIONS'){ 
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})
  
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);

module.exports = app;