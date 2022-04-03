const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')

router.get('/user/:id', userController.getUserId)

router.delete('/user/:id', userController.deleteUser)

router.post('/user', userController.createUser)

router.get('/users', userController.getUserAll)

router.put('/user/:email', userController.editUser)

module.exports = router