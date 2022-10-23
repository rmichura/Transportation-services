const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')
const loginController = require('../controllers/login-controller')
const orderController = require('../controllers/order-controller')

router.post('/login', loginController.login)

router.get('/user/:id', userController.getUserId)
router.delete('/user/:id', userController.deleteUser)
router.post('/user', userController.createUser)
router.get('/users', userController.getUserAll)
router.put('/user/:id', userController.editUser)

router.post('/order', orderController.createOrder)
router.get('/orders', orderController.getOrderAll)
router.get('/order/:id', orderController.getOrderId)
router.delete('/order/:id', orderController.deleteOrder)
router.put('/order/:id', orderController.editOrder)

module.exports = router
