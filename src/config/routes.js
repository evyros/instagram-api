
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const postsController = require('../controllers/posts.controller');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    try {
        const user = jwt.verify(token, 'shahar');
        req.userId = user.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(403).send();
    }
};

router.get('/user/me', auth, usersController.me);
router.post('/post', auth, postsController.create);
router.get('/post', postsController.getAll);
router.post('/user', usersController.create);
router.post('/login', usersController.login);
router.get('/health', (req, res) => {
    res.sendStatus(200);
});


module.exports = router;
