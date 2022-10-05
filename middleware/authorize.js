const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let decodedToken;
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        throw new Error('Not authenticate');
    }

    try {
        const token = authHeader.split(' ')[1];
        decodedToken = jwt.verify(token, 'r;K*Hx?l[<313U:le(Ai3]KXbsxT3p#Tu!7%PaIuIX6o*PF99C11Oz3NdPXSeI7Clg:&/h7Z|:F#jMI*u-;lEzvJAI\iglqi/_Oj');
    } catch (err) {
        err.message = 'bad token';
        throw err;
    }

    if (!decodedToken) {
        throw new Error('Not authenticate');
    }

    req.userId = decodedToken.userId;
    next();
}