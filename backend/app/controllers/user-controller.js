const User = require('../db/models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

class UserController {
    async createUser(req, res) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            password: req.body.password = hash,
        });
        await user.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created user successfully',
                createdUser: {
                    _id: result._id,
                    name: result.name,
                    lastName: result.lastName,
                    address: result.address,
                    email: result.email,
                    password: result.password,
                    apiToken: result.apiToken,
                    role: result.role,
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    }

    async editUser(req, res) {
        const id = req.params.id
        const user = await User.findOne({_id: id})
        if (req.body.name) user.name = req.body.name;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.address) user.address = req.body.address;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password !== '') {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            user.password = hash
        }

        await user.save().then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Edited user successfully',
                editedUser: {
                    _id: result._id,
                    name: result.name,
                    lastName: result.lastName,
                    address: result.address,
                    email: result.email,
                    password: result.password,
                    apiToken: result.apiToken,
                    role: result.role,
                }
            })
        }).catch(err => {
            console.log(err)
            res.status(422).json({
                error: err
            })
        })
    }

    async getUserId(req, res) {
        const id = req.params.id;
        await User.findById(id).then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                })
            } else {
                res.status(400).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    }

    async getUserAll(req, res) {
        await User.find().then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        lastName: doc.lastName,
                        address: doc.address,
                        email: doc.email,
                        password: doc.password,
                        apiToken: doc.apiToken,
                        role: doc.role,
                    }
                })
            }
            res.status(200).json(response);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        await User.deleteOne({_id: id})

        res.sendStatus(204);
    }
}

module.exports = new UserController();
