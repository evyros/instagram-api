const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postScheme = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: () => []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    image: {
        type: String
    }
});

const Post = mongoose.model('post', postScheme);

module.exports = Post;