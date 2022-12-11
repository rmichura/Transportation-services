const Driver = require('../db/models/driver')
const mongoose = require("mongoose")

class DriverController {
    async creatDriver(req, res) {
        const driver = new Driver({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            driverLicense: req.body.driverLicense,
            assignedToCar: 'false'
        });
        await driver.save().then(result => {
            res.status(201).json({
                message: 'Created driver successfully',
                createDriver: {
                    _id: new mongoose.Types.ObjectId(),
                    name: result.name,
                    lastName: result.lastName,
                    phoneNumber: result.phoneNumber,
                    driverLicense: result.driverLicense,
                    assignedToCar: result.assignedToCar
                }
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async editDriver(req, res) {
        const id = req.params.id;
        const driver = await Driver.findOne({_id: id})
        if (req.body.name) driver.name = req.body.name;
        if (req.body.lastName) driver.lastName = req.body.lastName;
        if (req.body.phoneNumber) driver.phoneNumber = req.body.phoneNumber;
        if (req.body.driverLicense) driver.driverLicense = req.body.driverLicense;
        if (req.body.assignedToCar) driver.assignedToCar = req.body.assignedToCar;

        await driver.save().then(result => {
            res.status(200).json({
                message: 'Edited order successfully',
                editDriver: {
                    _id: result._id,
                    name: result.name,
                    lastName: result.lastName,
                    phoneNumber: result.phoneNumber,
                    driverLicense: result.driverLicense,
                    assignedToCar: result.assignedToCar
                }
            })
        })
            .catch(err => {
                res.status(422).json({
                    error: err
                })
            })
    }

    async getDriverId(req, res) {
        const id = req.params.id;
        await Driver.findById(id).then(doc => {
            if (doc) {
                res.status(200).json({
                    driver: doc
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

    async getDriverAll(req, res) {
        await Driver.find().then(docs => {
            const response = {
                count: docs.length,
                drivers: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        lastName: doc.lastName,
                        phoneNumber: doc.phoneNumber,
                        driverLicense: doc.driverLicense,
                        assignedToCar: doc.assignedToCar
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

    async deleteDriver(req, res) {
        const id = req.params.id;
        await Driver.deleteOne({_id: id})
        res.sendStatus(204);
    }
}

module.exports = new DriverController();
