var express = require('express');
var apiRoutes = express.Router();

//NOTE: This needs to be changed to a POST instead of a GET
apiRoutes.route('/signup')
    .get((req, res) => {
        console.log('sign up reached');
    });
//Login User, return null if not found - Cory Lewis - 4/11/19
apiRoutes.route('/signin/:email/:password')
    .get((req, res) => {
        DATABASE.query('SELECT * FROM User WHERE Email = ? AND Password = ?', [req.params.email,req.params.password]).then(data => {
            //No User Found Check
            if(data == "") res.send(null);
            //User Found
            res.send({data : data});
        });
    });
module.exports = apiRoutes;