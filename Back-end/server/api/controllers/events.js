const db = require('../models/database.js');
const jwt = require('jsonwebtoken');

exports.postEvent = (req, res, next) => {
    db.query('INSERT INTO Event SET ?', 
    {Name: req.body.Name, Description: req.body.Description, AgeRestriction: req.body.AgeRestriction, 
    UserId: req.body.UserId, CategoryId: req.body.CategoryId, LocationId: req.body.CategoryId, 
    Image: req.file, StartDate: req.body.StartDate, StartTime: req.body.StartTime, EndTime: req.body.EndTime
    })
    .then( result => {
        res.status(200).json({
            message: "Event Post Successful",
            EventId: result.insertId
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
} 

exports.deleteEvent = (req, res, next) => {
    db.query('DELETE FROM Event WHERE id = ?', [req.params.id])
    .then( () => {
        res.status(200).json({
            message: "Event Deletion Successful"
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
}

