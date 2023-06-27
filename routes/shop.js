const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.gtProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart/DeleteItem', shopController.postCartDeleteProduct);

router.post('/orders', shopController.postOrders);
router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
