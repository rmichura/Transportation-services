const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productType: {
        type: String,
    },
    productWeight: {
        type: Number,
    },
    productWidth: {
        type: Number,
    },
    productHeight: {
        type: Number,
    },
    receptionVenue: {
        type: String,
    },
    destination: {
        type: String,
    },
    status: {
      type: String,
    },
    deadline: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Order = mongoose.model('Order', orderSchema)

module.exports = Order
