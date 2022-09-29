const Product = require('../models/product');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.getProducts = (req, res, next) => {
    const baseUrl = 'http://localhost:8080/';

    Product.find()
        .then(result => {
            res.status(200).json(result.map(product => ({
                id: product._id,
                title: product.title,
                amount: product.price,
                date: product.date,
                imageUrl: baseUrl + product.imageUrl,
                category: product.category
            })));
        })
        .catch(err => console.log(err));
}


exports.createProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const image = req.files[0];
    if (!image) {
        return;
    }

    const imageUrl = image.path;
    const title = req.body.title;
    const price = req.body.amount;
    const date = req.body.date;
    const category = 'U';

    const product = new Product({
        title: title,
        price: price,
        date: date,
        imageUrl: imageUrl,
        category: category
    });

    product.save()
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}


exports.updateProduct = (req, res, next) => {
    let updateImageUrl = req.body.imageUrl;

    const image = req.files[0];
    if (image) {
        updateImageUrl = image.path;
    }

    const productId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.amount;
    const updatedDate = req.body.date;
    const updatedCategory = req.body.category ? req.body.category : 'U';

    // console.log('productId', productId);
    Product.findById(mongoose.Types.ObjectId(productId))
        .then(product => {
            // console.log('findById', product);
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.date = updatedDate;
            product.imageUrl = updateImageUrl;
            product.category = updatedCategory;
            return product.save();
        })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}


exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByIdAndRemove(productId)
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
}


exports.getProductById = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(result => {
            res.status(200).json(result);
        })
}