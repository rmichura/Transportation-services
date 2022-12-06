const mongoose = require("mongoose")


const driverSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    driverLicense: {
        type: String,
        required: true
    }

})
const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver
