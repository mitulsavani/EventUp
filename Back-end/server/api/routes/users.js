const express = require('express');
const router = express.Router();

userController = require('../controllers/users.js');

router.post('/register', userController.register);

router.get('/login', userController.login);

module.exports = router;