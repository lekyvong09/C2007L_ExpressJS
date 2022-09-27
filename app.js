const express = require('express');
const adminRoutes = require('./routes/admin');


const app = express();

/**
 * filter / middleware
 */
app.use('/api', adminRoutes);

app.listen(8080);