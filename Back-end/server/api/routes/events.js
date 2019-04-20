const express = require('express');
const router = express.Router();

checkAuth = require('../middleware/check-auth.js');
eventController = require('../controllers/events.js');

router.post('/', eventController.postEvent);

module.exports = router; 