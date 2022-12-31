const Order = require('../db/models/order')
const mongoose = require("mongoose");
const e = require("express");

class OrderController {
    async createOrder(req, res) {
        const generateNumber = Math.floor(Math.random()*90000) + 10000;
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productType: req.body.productType,
            productWeight: req.body.productWeight,
            productWidth: req.body.productWidth,
            productHeight: req.body.productHeight,
            productLength: req.body.productLength,
            receptionPlace: req.body.receptionPlace,
            deliveryPlace: req.body.deliveryPlace,
            status: req.body.status,
            deliveryDate: req.body.deliveryDate,
            receptionDate: req.body.receptionDate,
            numberOrder: req.body.numberOrder = generateNumber,
            orderPrice: 0,
            distanceTransportation: 0,
            durationTransportation: 0,
            user: req.body.user
        });
        await order.save().then(result => {
            res.status(201).json({
                message: 'Created order successfully',
                createOrder: {
                    _id: new mongoose.Types.ObjectId(),
                    productType: result.productType,
                    productWeight: result.productWeight,
                    productWidth: result.productWidth,
                    productHeight: req.body.productHeight,
                    productLength: req.body.productLength,
                    receptionPlace: result.receptionPlace,
                    deliveryPlace: result.deliveryPlace,
                    status: result.status,
                    deliveryDate: result.deliveryDate,
                    receptionDate: result.receptionDate,
                    numberOrder: result.numberOrder,
                    orderPrice: result.orderPrice,
                    distanceTransportation: result.distanceTransportation,
                    durationTransportation: result.durationTransportation,
                    user: result.user
                }
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }

    async editOrder(req, res) {
        const id = req.params.id;
        const order = await Order.findOne({_id: id})
        if (req.body.productType) order.productType = req.body.productType;
        if (req.body.productWeight) order.productWeight = req.body.productWeight;
        if (req.body.productWidth) order.productWidth = req.body.productWidth;
        if (req.body.productHeight) order.productHeight = req.body.productHeight;
        if (req.body.productLength) order.productLength = req.body.productLength;
        if (req.body.receptionPlace) order.receptionPlace = req.body.receptionPlace;
        if (req.body.deliveryPlace) order.deliveryPlace = req.body.deliveryPlace;
        if (req.body.status) order.status = req.body.status;
        if (req.body.orderPrice) order.orderPrice = req.body.orderPrice;
        if (req.body.durationTransportation) order.durationTransportation = req.body.durationTransportation;
        if (req.body.distanceTransportation) order.distanceTransportation = req.body.distanceTransportation;
        if (req.body.deliveryDate) order.deliveryDate = req.body.deliveryDate;
        if (req.body.receptionDate) order.receptionDate = req.body.receptionDate;
        if (req.body.car) order.car = req.body.car;

        await order.save().then(result => {
            res.status(200).json({
                message: 'Edited order successfully',
                editOrder: {
                    _id: result._id,
                    productType: result.productType,
                    productWeight: result.productWeight,
                    productWidth: result.productWidth,
                    productHeight: result.productHeight,
                    productLength: result.productLength,
                    receptionPlace: result.receptionPlace,
                    deliveryPlace: result.deliveryPlace,
                    status: result.status,
                    deliveryDate: result.deliveryDate,
                    receptionDate: result.receptionDate,
                    numberOrder: result.numberOrder,
                    orderPrice: result.orderPrice,
                    distanceTransportation: result.distanceTransportation,
                    durationTransportation: result.durationTransportation,
                    car: result.car
                }
            })
        })
            .catch(err => {
                res.status(422).json({
                    error: err
                })
            })
    }

    async getOrderId(req, res) {
        const id = req.params.id;
        await Order.findById(id).then(doc => {
            if (doc) {
                res.status(200).json({
                    order: doc
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

    async getOrderAll(req, res) {
        await Order.find().then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        productType: doc.productType,
                        productWeight: doc.productWeight,
                        productWidth: doc.productWidth,
                        productHeight: doc.productHeight,
                        productLength: doc.productLength,
                        receptionPlace: doc.receptionPlace,
                        deliveryPlace: doc.deliveryPlace,
                        status: doc.status,
                        deliveryDate: doc.deliveryDate,
                        receptionDate: doc.receptionDate,
                        numberOrder: doc.numberOrder,
                        orderPrice: doc.orderPrice,
                        distanceTransportation: doc.distanceTransportation,
                        durationTransportation: doc.durationTransportation,
                        user: doc.user,
                        car: doc.car
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

    async deleteOrder(req, res) {
        const id = req.params.id;
        await Order.deleteOne({_id: id})

        res.sendStatus(204);
    }
}

module.exports = new OrderController();
