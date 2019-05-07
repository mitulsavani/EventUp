const db = require('../models/database.js');

exports.send = (req, res, next) => {

    //insert into mesages table
}

exports.receive = (req, res, next) => {
    //UNTESTED query , Cory, 5/7/19
    db.query('SELECT Message.Message, Message.Timestamp'+
    ' FROM Message'+
    ' WHERE Message.FkReceiverEventId = ?', [req.params.EventId]).then((data) => {
        //send correct data
    }).catch((data) => {
        //catch error
    });

    //get all messages

}