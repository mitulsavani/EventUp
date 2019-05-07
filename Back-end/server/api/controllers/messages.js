const db = require('../models/database.js');

exports.send = (req, res, next) => {
    db.query('INSERT INTO Message SET ?', 
    {FkSenderUserId: req.body.SenderUserId, FkReceiverEventId: req.body.ReceiverEventId, Message: req.body.Message})
    .then( result => {
        res.status(200).json({
            message: "Message Sent",
            status: true,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            status: false
        })
    })
}

exports.receive = (req, res, next) => {
    console.log("passed id: " + req.params.EventId);
    //UNTESTED query , Cory, 5/7/19
    db.query('SELECT Message.Message, Message.Timestamp'+
    ' FROM Message'+
    ' WHERE Message.FkReceiverEventId = ?' + 
    'ORDER BY Message.id DESC', [req.params.EventId]).then(([data,_]) => {
        res.status(200).json({
            message: "Message(s) Received",
            status: true,
            data: data
        })
    }).catch((err) => {
        res.status(200).json({
            message: "Message(s) Retrieval Failed",
            status: false,
            err: err
        })
    });

}