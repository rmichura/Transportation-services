const mongoose = require("mongoose");


const carSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    maxWidth: {
        type: Number,
        required: true,
    },
    maxWeight: {
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
    }
})
const Car = mongoose.model('Car', carSchema)

module.exports = Car
