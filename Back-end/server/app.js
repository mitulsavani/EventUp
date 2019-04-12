const express = require('express');
const app = express();  

const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const db = require('./api/models/database.js');

//Define Routes
const userRoutes = require('./api/routes/apiRoutes');

//Test Database Connection
db.connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected Successfully!");
  });


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);

module.exports = app;