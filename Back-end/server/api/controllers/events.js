const db = require('../models/database.js');
const fs = require('file-system')
const jwt = require('jsonwebtoken');

exports.getAllEvents = (req, res, next) => {
    db.query('SELECT Event.*, '+
    'Category.Name AS CategoryName, Location.Name AS LocationName, Location.Longitude, Location.Latitude'+
    ' FROM Event JOIN Location ON Event.LocationId = Location.id JOIN Category '+
    'ON Event.CategoryId = Category.id').then( ([result, fields]) => {
        res.status(200).json({
            status: true,
            message: "All events queried",
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

    let data = req.body.Image.substring(18);
    data.replace(' ', '+');
    data = new Buffer(data.toString(), 'base64')
    let filename = new Date().toISOString().replace(/:/g, '-') + '.jpeg';

    fs.writeFile(`./uploads/${filename}`, data, function(err) {
        if (err) console.log(err);
    })

    db.query('INSERT INTO Event SET ?', 
    {Name: req.body.Name, Description: req.body.Description, AgeRestriction: req.body.AgeRestriction, 
    UserId: req.body.UserId, CategoryId: req.body.CategoryId, LocationId: req.body.CategoryId, 
    Image: 'ec2-54-183-219-162.us-west-1.compute.amazonaws.com:3000/uploads/' + filename, 
    StartDate: req.body.StartDate, StartTime: req.body.StartTime, EndTime: req.body.EndTime
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

exports.getEvent = (req, res, next) => {
    // console.log(req.params.UserId +" --- "+ req.params.id);
    // db.query('SELECT COUNT(1)'+
    // 'FROM RSVP'+
    // 'WHERE UserId = ? AND EventId = ?;',req.params.UserId, req.params.id).then((isRSVP) => {

        // db.query('SELECT Event.*, '+
        // 'Category.Name AS CategoryName, Location.Name AS LocationName'+
        // ' FROM Event JOIN Location ON Event.LocationId = Location.id JOIN Category '+
        // 'ON Event.CategoryId = Category.id'+
        // ' WHERE Event.id = ?', [req.params.id])

        db.query('SELECT Event.*, '+
        'Category.Name AS CategoryName ,Location.Name AS LocationName, Location.Longitude, Location.Latitude'+
        ' FROM Event JOIN Location ON Event.LocationId = Location.id JOIN Category '+
        'ON Event.CategoryId = Category.id'+
        ' WHERE Event.id = ?', [req.params.id])
        .then( (data) => {
            res.status(200).json({
                status: true,
                event: data[0], 
                message: "retrieved successfully"
                //isRSVP:isRSVP
            })
        })
        .catch( err => {
            res.status(500).json({
                status: false,
                message: err
            })
        })
    //})
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

