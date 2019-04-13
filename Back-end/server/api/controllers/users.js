const db = require('../models/database.js');

exports.register = (req, res, next) => {
    db.query('INSERT INTO User SET ?', 
    {FirstName: req.body.FirstName, LastName: req.body.LastName, Email: req.body.Email, Password: req.body.Password})
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
    db.query('SELECT * FROM User WHERE Email = ? AND Password = ?', [req.body.Email,req.body.Password])
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