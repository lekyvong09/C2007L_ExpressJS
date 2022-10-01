const express = require('express');
const shopController = require('../controllers/shop-controller');

const router = express.Router();

router.post('/checkout', shopController.checkout);
router.get('/orders', shopController.getOrders);

module.exports = router;