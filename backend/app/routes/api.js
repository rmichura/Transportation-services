const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')
const loginController = require('../controllers/login-controller')

router.post('/login', loginController.login)

router.get('/user/:id', userController.getUserId)

router.delete('/user/:id', userController.deleteUser)

router.post('/user', userController.createUser)

router.get('/users', userController.getUserAll)

router.put('/user/:id', userController.editUser)

module.exports = router
