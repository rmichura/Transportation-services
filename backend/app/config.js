require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.DATABASE || 'mongodb+srv://user:user@cluster0.mhqbq.mongodb.net/transportation-services?retryWrites=true&w=majority'
}