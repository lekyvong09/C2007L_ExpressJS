const express = require('express');
const productsController = require('../controllers/products-controller');

const router = express.Router();

/// GET /api/products
router.get('/products', productsController.getProducts);

/// POST /api/products
router.post('/products/add', productsController.createProduct);
router.post('/products/update', productsController.updateProduct);

/// DELETE /api/products/delete/id
router.delete('/products/delete/:productId', productsController.deleteProduct);

module.exports = router;