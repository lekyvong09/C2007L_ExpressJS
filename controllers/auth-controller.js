const User = require('../models/user');
const Role = require('../models/role');
bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.register = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 400;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password
                        ? req.body.password
                        : Math.random   /// random number: 0.123456
                            .toString(36)   /// convert to base 36: "0.4dfjsaf2435fre"
                            .substr(2, 8); /// 4dfjsaf2435fre

    const roles = [];

    Role.findOne({name: 'USER'})
        .then(role => {
            roles.push(role);

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        username,
                        password: hashedPassword,
                        roles
                    });
        
                    return user.save();
                })
                .then(result => res.json({message: 'User created', email: result.email, password: result.password}))
                .catch(err => next(err))
        });
}