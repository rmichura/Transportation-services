const express = require('express');
const router = express.Router();
const multer = require('multer')

const userController = require('../controllers/user-controller')
const loginController = require('../controllers/login-controller')
const orderController = require('../controllers/order-controller')
const carController = require('../controllers/car-controller')
const driverController = require('../controllers/driver-controller')
const checkAuth = require('./check-auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('message'), false);
    }
}

const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter: fileFilter
});

router.post('/login', loginController.login)

router.get('/user/:id', checkAuth, userController.getUserId)
router.delete('/user/:id', checkAuth, userController.deleteUser)
router.post('/user', userController.createUser)
router.get('/users', checkAuth, userController.getUserAll)
router.put('/user/:id', checkAuth, userController.editUser)

router.post('/order', checkAuth, orderController.createOrder)
router.get('/orders', checkAuth, orderController.getOrderAll)
router.get('/order/:id', checkAuth, orderController.getOrderId)
router.delete('/order/:id', checkAuth, orderController.deleteOrder)
router.put('/order/:id', checkAuth, orderController.editOrder)

router.post('/car', checkAuth, upload.single('img'), carController.createCar)
router.get('/cars', checkAuth, carController.getCarAll)
router.get('/car/:id', checkAuth, carController.getCarId)
router.delete('/car/:id', checkAuth, carController.deleteCar)
router.put('/car/:id', checkAuth, upload.single('img'), carController.editCar)

router.post('/driver', checkAuth, driverController.creatDriver)
router.get('/drivers', checkAuth, driverController.getDriverAll)
router.get('/driver/:id', checkAuth, driverController.getDriverId)
router.delete('/driver/:id', checkAuth, driverController.deleteDriver)
router.put('/driver/:id', checkAuth, driverController.editDriver)


module.exports = router
