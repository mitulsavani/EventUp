const db = require('../models/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error: err
            });
        }
        else {
            db.query('INSERT INTO User SET ?', 
            {FirstName: req.body.FirstName, LastName: req.body.LastName, Email: req.body.Email, Password: hash})
            .then(([result, fields]) => {
                const token = jwt.sign(
                    {
                        id: result.insertId,
                        FirstName: req.FirstName,
                        LastName: req.LastName,
                        Email: req.Email,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h'
                    }
                )
                res.status(200).json({
                    message: 'Successful login',
                    token: token
                });
            })
            .catch(err => {
                res.send({
                    message: 'error',
                    error: err
                });
            })
            }
        });
}

exports.login = (req, res, next) => {
    db.query('SELECT * FROM User WHERE Email = ?', req.body.Email)
    .then(([user, fields]) => {
        //No User Found Check
        if(user == "") {
            res.status(404).json({
                message: 'User not found'
            });
        }
        bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
            if(result) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Email: user.Email,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '24h'
                    }
                )
                res.status(200).json({
                    message: 'Successful login',
                    token: token
                });
            }
            else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        });
    })
    .catch(err => {
        res.send({
            message: err
        })
    })
} 

exports.RSVP = (req, res, next) => {
    db.query('INSERT INTO RSVP SET ?', 
    { UserId: req.body.UserId, EventId: req.body.EventId })
    .then(([result, fields]) => {
        res.status(200).json({
            message: "RSVP Successful"
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
}

exports.revoke = (req, res, next) => {
    db.query('DELETE FROM RSVP WHERE UserId = ? AND EventId = ?', [req.body.UserId, req.body.EventId])
    .then( ([result, fields]) => {
        res.status(200).json({
            message: "RSVP Deletion Successful"
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
} 

exports.getUsers = (req, res, next) => {
    db.query('SELECT * FROM User')
    .then(([users, fields]) => {
        const response = {
            UserCount: users.length,
            users: users
        }
        res.status(200).json(response);
    });
}