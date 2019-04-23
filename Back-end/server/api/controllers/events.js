const db = require('../models/database.js');
const jwt = require('jsonwebtoken');

exports.getAllEvents = (req, res, next) => {
    db.query('SELECT * FROM Event').then( ([result, fields]) => {
        res.status(200).json({
            status: true,
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            message : "Event Query Failed",
            error: err
        })
    })
}

exports.postEvent = (req, res, next) => {
    db.query('INSERT INTO Event SET ?', 
    {Name: req.body.Name, Description: req.body.Description, AgeRestriction: req.body.AgeRestriction, 
    UserId: req.body.UserId, CategoryId: req.body.CategoryId, LocationId: req.body.CategoryId, 
    Image: req.file, StartDate: req.body.StartDate, StartTime: req.body.StartTime, EndTime: req.body.EndTime
    })
    .then( result => {
        res.status(200).json({
            message: "Event Post Successful",
            status: true,
            EventId: result.insertId
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            status: false
        })
    })
} 

exports.deleteEvent = (req, res, next) => {
    db.query('DELETE FROM Event WHERE id = ?', [req.params.id])
    .then( () => {
        res.status(200).json({
            status: true,
            message: "Event Deletion Successful"
        })
    })
    .catch( err => {
        res.status(500).json({
            status: false,
            message: err
        })
    })
}

