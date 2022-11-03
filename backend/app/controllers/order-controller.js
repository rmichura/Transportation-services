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
            receptionVenue: req.body.receptionVenue,
            destination: req.body.destination,
            status: req.body.status,
            deadline: req.body.deadline,
            numberOrder: req.body.numberOrder = generateNumber,
            orderPrice: 0,
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
                    receptionVenue: result.receptionVenue,
                    destination: result.destination,
                    status: result.status,
                    deadline: result.deadline,
                    numberOrder: result.numberOrder,
                    orderPrice: result.orderPrice,
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
        if (req.body.receptionVenue) order.receptionVenue = req.body.receptionVenue;
        if (req.body.destination) order.destination = req.body.destination;
        if (req.body.status) order.status = req.body.status;
        if (req.body.orderPrice) order.orderPrice = req.body.orderPrice;
        if (req.body.deadline) order.deadline = req.body.deadline;

        await order.save().then(result => {
            res.status(200).json({
                message: 'Edited order successfully',
                editOrder: {
                    _id: result._id,
                    productType: result.productType,
                    productWeight: result.productWeight,
                    productWidth: result.productWidth,
                    productHeight: result.productHeight,
                    receptionVenue: result.receptionVenue,
                    destination: result.destination,
                    status: result.status,
                    deadline: result.deadline,
                    numberOrder: result.numberOrder,
                    orderPrice: result.orderPrice
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
                        receptionVenue: doc.receptionVenue,
                        destination: doc.destination,
                        status: doc.status,
                        deadline: doc.deadline,
                        numberOrder: doc.numberOrder,
                        orderPrice: doc.orderPrice,
                        user: doc.user
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
