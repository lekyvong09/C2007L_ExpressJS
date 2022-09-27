const express = require('express');
const adminRoutes = require('./routes/admin');
const bodyParser = require('body-parser');
const path = require('path');

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

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api', adminRoutes);

app.listen(8080);