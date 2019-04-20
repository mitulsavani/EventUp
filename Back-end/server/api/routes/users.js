const express = require('express');
const router = express.Router();

checkAuth = require('../middleware/check-auth.js');
userController = require('../controllers/users.js');

router.put('/register', userController.register);

router.post('/login', userController.login);

router.get('/', checkAuth, userController.getUsers);

module.exports = router; 