const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [4],
    },
    apiToken: String,
});

userSchema.pre('save', function (next) {
    const user = this
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});

userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        error.errors = { email: {
                message: 'We already have such an e-mail'
            }};
    }
    next(error);
})

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isNew) {
        user.apiToken = randomstring.generate(50);
    }
    next();
})

userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User