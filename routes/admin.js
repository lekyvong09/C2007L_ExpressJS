const express = require('express');
const productsController = require('../controllers/products-controller');

const router = express.Router();

/// GET /api/products
router.get('/products', productsController.getProducts);

module.exports = router;