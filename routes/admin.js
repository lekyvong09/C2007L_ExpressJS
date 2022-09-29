const express = require('express');
const productsController = require('../controllers/products-controller');
const { check } = require('express-validator');
const Product = require('../models/product');
const { default: mongoose } = require('mongoose');

const router = express.Router();

/// GET /api/products
router.get('/products', productsController.getProducts);

/// POST /api/products
router.post('/products/add',
            check('amount').isNumeric().withMessage('price must be a number'),
            check('title').custom(value => {
                return Product.findOne({title: value}).then(product => {
                    if (product) {
                        throw new Error('Product name already exist');
                    }
                })
            }),
            check('date').custom(value => {
                if (isNaN(Date.parse(value))) {
                    throw new Error('Not a valid date');
                }
                return true;
            }),
            productsController.createProduct);

router.post('/products/update', 
            check('amount').isNumeric().withMessage('price must be a number'),
            check('date').custom(value => {
                if (isNaN(Date.parse(value))) {
                    throw new Error('Not a valid date');
                }
                return true;
            }),
            check('title').custom(value => {
                return Product.findOne({title: value }).then(product => {
                    if (product) {
                        throw new Error('Product name already exist');
                    }
                })
            }),
            productsController.updateProduct);

/// DELETE /api/products/delete/id
router.delete('/products/delete/:productId', productsController.deleteProduct);

module.exports = router;