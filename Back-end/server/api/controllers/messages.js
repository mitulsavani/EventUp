/*Messages Controller
    -Handles requests from messages router
    -Handles database logic associated with messages
*/

const db = require('../models/database.js');
let checkAuth = require('../middleware/check-auth.js');
const jwt = require('jsonwebtoken');

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
    let userToken = jwt.decode(req.headers.authorization);
    console.log(req.headers.authorization);
    db.query('SELECT Message.Message, Message.Timestamp, Message.FkSenderUserId, User.FirstName, User.LastName'+
    ' FROM Message'+
    ' JOIN User ON User.id = Message.FkSenderUserId'+
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