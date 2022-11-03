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
    receptionVenue: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    status: {
      type: String,
        required: true,
    },
    deadline: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
