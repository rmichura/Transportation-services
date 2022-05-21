const User = require('../db/models/user')

class LoginController {
    async login(req, res) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                throw new Error('user not found');
            }

            const isValidPassword = user.comparePassword(req.body.password);
            if (!isValidPassword) {
                throw new Error('password not valid');
            }

            res.status(200).json({apiToken: user.apiToken, _id: user._id});
        } catch (e) {
            res.sendStatus(401);
        }
    }
}

module.exports = new LoginController();