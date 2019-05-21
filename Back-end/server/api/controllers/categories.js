/*Category Controller
    -Handles requests from category router
    -Handles database logic associated with categories
*/

const db = require('../models/database.js');

exports.getAllCategories = (req, res, next) => {
    db.query('SELECT * FROM Category').then( ([data, fields]) => {
        res.status(200).json({
            status: true,
            message: "All Categories Queried",
            data: data
        });
    }).catch(err => {   
        res.status(500).json({
            status: false,
            message : "Category Query Failed",
            error: err
        })
    })
}