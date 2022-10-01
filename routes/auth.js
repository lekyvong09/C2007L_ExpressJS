const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { check } = require('express-validator');
const User = require('../models/user');

router.post('/register',
            check('email')
                .isEmail().withMessage('Not a valid email')
                .custom(value => {
                    return User.findOne({email: value}).then(user => {
                        if (user) {
                            return Promise.reject('Email has already been used.');
                        }
                    });
                }),
            check('username')
                .custom(value => {
                    return User.findOne({username: value}).then(user => {
                        if (user) {
                            return Promise.reject('Username has already been used.');
                        }
                    });
                }),
            authController.register);

router.post('/login', authController.login);

module.exports = router;