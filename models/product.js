const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: true,
        default: 'image/placeholder.png'
    },
    category: {
        type: String,
        required: true,
        default: 'U'
    }
});


module.exports = mongoose.model('Product', productSchema);