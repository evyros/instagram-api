
const User = require('../models/user');

async function create(req, res) {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    create
};