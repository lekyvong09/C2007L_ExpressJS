const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

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


exports.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    let loadedUser;
    User.findOne({username: username}).then(user => {
        if (!user) {
            throw new Error('User does not exist');
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(validPassword => {
        if (!validPassword) {
            throw new Error('Fail to login');
        }

        const token = jwt.sign(
            {
                email: loadedUser.email,
                username: loadedUser.username,
                userId: loadedUser._id.toString()
            },
            'r;K*Hx?l[<313U:le(Ai3]KXbsxT3p#Tu!7%PaIuIX6o*PF99C11Oz3NdPXSeI7Clg:&/h7Z|:F#jMI*u-;lEzvJAI\iglqi/_Oj',
            {expiresIn: '24h'}
        );

        res.status(200).json({token: token});
    })
    .catch(err => console.log(err));
}