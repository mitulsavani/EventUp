/*Create express server to handle API requests
  -apply neccessary modules to access request inormation.
*/

const express = require('express');
const app = express();  

const morgan = require('morgan'); 
const bodyParser = require('body-parser'); 
const db = require('./api/models/database.js'); 

const userRoutes = require('./api/routes/users');
const eventRoutes = require('./api/routes/events');
const messageRoutes = require('./api/routes/messages');
const categoryRoutes = require('./api/routes/categories');
const locationRoutes = require('./api/routes/locations');

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
app.use(bodyParser.json({limit: '50mb'}));

app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/messages', messageRoutes);
app.use('/categories', categoryRoutes);
app.use('/locations', locationRoutes);

module.exports = app;