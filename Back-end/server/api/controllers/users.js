const db = require('../models/database.js');

exports.register = (req, res, next) => {
    db.query('INSERT INTO User VALUES ?', 
    (req.body.firstName, req.body.lastName, req.body.email, req.body.password))
    .then(() => {
        res.send({
            message: 'registration successful!'
        });
    })
    .catch(err => {
        res.send({
            message: 'registration unsuccessful',
            error: err
        });
    })
}

exports.login = (req, res, next) => {
    db.query('SELECT * FROM User WHERE Email = ? AND Password = ?', [req.params.email,req.params.password])
    .then(data => {
        //No User Found Check
        if(data == "") {
            res.send(null);
        }
        res.send({
            data: data
        })
    })
    .catch(err => {
        res.send({
            message:'login unsuccessful',
            error: err
        })
    })
}