const User = require('../db/models/user')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const user = await User.findOne({apiToken: token})
        if (user) {
            next()
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}
