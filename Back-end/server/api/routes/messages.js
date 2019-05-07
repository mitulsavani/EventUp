const express = require('express');
const router = express.Router();

checkAuth = require('../middleware/check-auth.js');
messageController = require('../controllers/messages.js');

router.post('/send', messageController.send);
router.get('/:EventId', messageController.receive);


module.exports = router; 