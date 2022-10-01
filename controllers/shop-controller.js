const Order = require('../models/order');


exports.checkout = (req, res, next) => {
    const order = new Order({
        name: req.body.name,
        address: req.body.address,
        total: req.body.total,
        items: req.body.items,
    });

    order.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => console.log(err));
}


exports.getOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            res.status(200).json(orders);
        })
        .catch(err => console.log(err));
}