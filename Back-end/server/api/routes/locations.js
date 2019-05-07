const express = require('express');
const router = express.Router();

let locationController = require('../controllers/locations.js');

router.get('/', locationController.getAllLocations);

module.exports = router; 