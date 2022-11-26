const express = require('express');
const router = express.Router();
const multer = require('multer')

const userController = require('../controllers/user-controller')
const loginController = require('../controllers/login-controller')
const orderController = require('../controllers/order-controller')
const carController = require('../controllers/car-controller')

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

router.post('/car', upload.single('img'), carController.createCar)
router.get('/cars', carController.getCarAll)
router.get('/car/:id', carController.getCarId)
router.delete('/car/:id', carController.deleteCar)
router.put('/car/:id', upload.single('img'), carController.editCar)

module.exports = router
