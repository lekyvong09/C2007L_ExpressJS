const express = require('express');
const shopController = require('../controllers/shop-controller');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post('/checkout', shopController.checkout);
router.get('/orders', authorize, shopController.getOrders);

/// next middleware authorize JWT

module.exports = router;