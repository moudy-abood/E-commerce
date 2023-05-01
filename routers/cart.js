const express = require('express');
const router = express.Router();
const { auth, checkAvailableCart, checkItem, checkCart } = require('./middleware');
const controller = require('./controller/cart');

router.post('/', auth, checkAvailableCart, controller.createCart);

router.get('/:cartUuid', auth, checkCart, controller.getCart);

router.post('/:cartUuid/item', auth, checkCart, controller.addItemToCart);

router.put('/:cartUuid/item/:uuid', auth, checkCart, checkItem, controller.updateItem);

router.delete('/:cartUuid/item/:uuid', auth, checkCart, checkItem, controller.RemoveItemFromCart);

module.exports = router;
