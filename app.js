const express = require('express');
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const app = express();

/**
 * CORS settings
 */
 app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/**
 * filter / middleware
 */
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'images')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).array('file'));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', adminRoutes);
app.use('/api/user', authRoutes);
app.use('/api', shopRoutes);

/// global handle error
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const data = error.data;
    res.status(status).json({message: error.message, data: data});
})

mongoose.connect('mongodb+srv://root:ab123456..@cluster0.pgeminn.mongodb.net/shop_rest?retryWrites=true&w=majority')
    .then(result => {
        const httpServer = app.listen(8080);
        console.log('API is listening to port 8080');

        const io = require('./socket').init(httpServer);

        io.use((socket, next) => {
            const token = socket.handshake.auth.token.split(" ")[1];
            require('jsonwebtoken').verify(token, 'r;K*Hx?l[<313U:le(Ai3]KXbsxT3p#Tu!7%PaIuIX6o*PF99C11Oz3NdPXSeI7Clg:&/h7Z|:F#jMI*u-;lEzvJAI\iglqi/_Oj', (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    return next(new Error('Authentication error'));
                }
                socket.decoded = decodedToken;
                next();
            })
        });

        io.on('connection', socket => {
            // console.log('Client connected');
            console.log(socket.decoded);
            console.log(socket.id, ' connected');
            socket.join('room1');
        });
    })
    .catch(err => console.log(err));