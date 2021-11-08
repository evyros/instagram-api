const Post = require("../models/post.js");
const User = require("../models/user.js");
const mongoose = require('mongoose');

async function create(req, res) {
    const { body } = req.body;
    const tempPost = {
        body,
        image: req.file.filename,
        author: req.userId
    };
    const post = new Post(tempPost);
    try {
        const savedPost = await post.save();
        res.status(201).send(savedPost);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Could not save post' });
    }
}

async function getAll(req, res) {
    const allPosts = await Post.find({}).populate('author');
    res.json(allPosts);
}

async function getPosts(req, res) {
    const { username } = req.params;
    const user = await User.findOne({username});
    const posts = await Post.find({author: user._id }).populate('author');
    res.send(posts);
}

async function like(req, res) {
    await Post.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: mongoose.Types.ObjectId(req.userId) } }
    );
    res.sendStatus(200);
}

async function unlike(req, res) {
    await Post.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: mongoose.Types.ObjectId(req.userId) } }
    );
    res.sendStatus(200);
}

module.exports = {
    create,
    getAll,
    getPosts,
    like,
    unlike
}