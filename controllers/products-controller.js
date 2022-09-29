const Product = require('../models/product');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

exports.getProducts = (req, res, next) => {
    const baseUrl = 'http://localhost:8080/';
    res.status(200).json({
        products: [
            {id: '1', title: 'Superman: Action Comics Volume 5', date: new Date(), amount: 12.99, imageUrl: baseUrl + "images/BOOK-COMIC-1000.jpg", category: 'C'},
            {id: '2', title: 'Batman: The Silver Age Omnibus', date: new Date(), amount: 99.99, imageUrl: baseUrl + "images/BOOK-COMIC-1001.jpg", category: 'C'},
            {id: '3', title: 'The Fifth Science', date: new Date(), amount: 24.99, imageUrl: baseUrl + "images/BOOK-FICTION-1002.jpg", category: 'F'},
            {id: '4', title: 'The Summer House', date: new Date(), amount: 15.00, imageUrl: baseUrl + "images/BOOK-ROMANTIC-1003.jpg", category: 'R'},
            {id: '5', title: 'The Art of Computer Programming', date: new Date(), amount: 187.99, imageUrl: baseUrl + "images/BOOK-PROGRAMMING-1004.jpg", category: 'P'}
        ]
    });
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