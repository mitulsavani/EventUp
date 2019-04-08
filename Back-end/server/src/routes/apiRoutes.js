var express = require('express');
var apiRoutes = express.Router();

//URL to execute this is: localhost:3000/api/signup
apiRoutes.route('/signup')
    .get((req, res) => {
        console.log('sign up reached');
    });
//URL to execute this is: localhost:3000/api/signin
apiRoutes.route('/signin')
    .get((req, res) => {
        console.log('sign in reached');
    });

module.exports = apiRoutes;