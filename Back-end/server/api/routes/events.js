const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

checkAuth = require('../middleware/check-auth.js');
eventController = require('../controllers/events.js');

router.post('/', checkAuth, upload.single('Image'), eventController.postEvent);

router.delete('/:id', checkAuth, eventController.deleteEvent);

module.exports = router; 