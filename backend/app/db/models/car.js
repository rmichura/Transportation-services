const mongoose = require("mongoose");


const carSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    maxWidth: {
        type: Number,
        required: true,
    },
    maxHeight: {
        type: Number,
        required: true,
    },
    maxLength: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    numberCar: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
})
const Car = mongoose.model('Car', carSchema)

module.exports = Car
