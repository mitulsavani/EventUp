/*Users Router
    sends requests to respective controller functions
*/ 


const express = require('express');
const router = express.Router();

checkAuth = require('../middleware/check-auth.js');
userController = require('../controllers/users.js');

router.put('/register', userController.register);

router.post('/login', userController.login);

router.get('/', checkAuth, userController.getUsers); 

router.get('/:id(\\d+)', checkAuth, userController.getUser); 

router.get('/RSVP/:UserId(\\d+)',checkAuth, userController.getRSVP);

router.post('/RSVP',checkAuth, userController.RSVP);

router.delete('/RSVP',checkAuth, userController.revoke);

router.post('/posts',checkAuth, userController.getPosts);

module.exports = router; 