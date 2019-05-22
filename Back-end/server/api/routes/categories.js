/*Categories Router
    sends requests to respective controller functions
*/

const express = require('express');
const router = express.Router();

categoryController = require('../controllers/categories.js');

router.get('/', categoryController.getAllCategories);


module.exports = router; 