const express = require('express');
const app = express();    

//morgan is used to console log requests from client
const morgan = require('morgan'); 
//body-parser is used to parse json bodies from client requests
const bodyParser = require('body-parser'); 

const apiRoutes = require('./src/routes/apiRoutes');

app.use('/api/', apiRoutes);

module.exports = app;