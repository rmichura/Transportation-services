const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productType: {
        type: String,
        required: true,
    },
    productWeight: {
        type: Number,
        required: true,
    },
    productWidth: {
        type: Number,
        required: true,
    },
    productHeight: {
        type: Number,
        required: true,
    },
    productLength: {
        type: Number,
        required: true,
    },
    receptionPlace: {
        type: String,
        required: true,
    },
    deliveryPlace: {
        type: String,
        required: true,
    },
    status: {
      type: String,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
    receptionDate: {
        type: Date,
        required: true,
    },
    numberOrder: {
        type: Number,
        required: true,
    },
    orderPrice: {
        type: Number
    },
    distanceTransportation: {
        type: Number
    },
    durationTransportation: {
        type: Number
    },
    startTimeOrder: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    },
});
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
