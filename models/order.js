const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    items: [
        {
            id: {type: mongoose.SchemaTypes.ObjectId},
            imageUrl: {type: String},
            qty: {type: Number},
            title: {type: String},
            unit: {type: Number},
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);