const Car = require('../db/models/car')
const mongoose = require("mongoose")
const path = require('path')
const fs = require("fs");

class CarController {
    async createCar(req, res) {
        const car = new Car({
            _id: new mongoose.Types.ObjectId(),
            brand: req.body.brand,
            type: req.body.type,
            capacity: req.body.capacity,
            maxWidth: req.body.maxWidth,
            maxHeight: req.body.maxHeight,
            status: req.body.status,
            numberCar: req.body.numberCar,
            img: req.file.path
        });
        await car.save().then(result => {
            res.status(201).json({
                message: 'Created car successfully',
                createCar: {
                    _id: new mongoose.Types.ObjectId(),
                    brand: result.brand,
                    type: result.type,
                    capacity: result.capacity,
                    maxWidth: result.maxWidth,
                    maxHeight: result.maxHeight,
                    status: result.status,
                    numberCar: result.numberCar,
                    img: result.img
                }
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async editCar(req, res) {
        const id = req.params.id;
        const car = await Car.findOne({_id: id})
        if (req.body.brand) car.brand = req.body.brand;
        if (req.body.type) car.type = req.body.type;
        if (req.body.capacity) car.capacity = req.body.capacity;
        if (req.body.maxWidth) car.maxWidth = req.body.maxWidth;
        if (req.body.maxHeight) car.maxHeight = req.body.maxHeight;
        if (req.body.status) car.status = req.body.status;
        if (req.body.numberCar) car.numberCar = req.body.numberCar;
        if (req.file) {
            const __dirname = path.resolve()
            const filePath = path.join(__dirname, car.img)
            fs.unlink(filePath, () => {
            })
            car.img = req.file.path;
        }

        await car.save().then(result => {
            res.status(200).json({
                message: 'Edited order successfully',
                editCar: {
                    _id: result._id,
                    brand: result.brand,
                    type: result.type,
                    capacity: result.capacity,
                    maxWidth: result.maxWidth,
                    maxHeight: result.maxHeight,
                    status: result.status,
                    numberCar: result.numberCar,
                    img: result.img
                }
            })
        })
            .catch(err => {
                res.status(422).json({
                    error: err
                })
            })
    }

    async getCarId(req, res) {
        const id = req.params.id;
        await Car.findById(id).then(doc => {
            if (doc) {
                res.status(200).json({
                    car: doc
                })
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async getCarAll(req, res) {
        await Car.find().then(docs => {
            const response = {
                count: docs.length,
                cars: docs.map(doc => {
                    return {
                        _id: doc._id,
                        brand: doc.brand,
                        type: doc.type,
                        capacity: doc.capacity,
                        maxWidth: doc.maxWidth,
                        maxHeight: doc.maxHeight,
                        status: doc.status,
                        numberCar: doc.numberCar,
                        img: doc.img
                    }
                })
            }
            res.status(200).json(response);
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async deleteCar(req, res) {
        const id = req.params.id;
        const car = await Car.findOne({_id: id})
        if (car.img) {
            const __dirname = path.resolve()
            const filePath = path.join(__dirname, car.img)
            console.log(filePath)
            fs.unlink(filePath, () => {
            })
        }
        await Car.deleteOne({_id: id})
        res.sendStatus(204);
    }
}

module.exports = new CarController();
