/*Location Controller
    -Handles requests from location router
    -Handles database logic associated with locations
*/

const db = require('../models/database.js');

exports.getAllLocations = (req, res, next) => {
    db.query('SELECT * FROM Location').then( ([data,_]) => {
        res.status(200).json({
            status: true,
            message: "All Locations queried",
            data: data
        });
    }).catch(err => {   
        res.status(500).json({
            status: false,
            message : "Location Query Failed",
            error: err
        })
    })
}