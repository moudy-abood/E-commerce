const express = require('express');
const router = express.Router();
const { checkAvailableCart, checkItem, checkCart } = require('../../middleware');
const controller = require('./controller');

router.post('/', checkAvailableCart, controller.createCart);

router.get('/:cartUuid', checkCart, controller.getCart);

router.post('/:cartUuid/item', checkCart, controller.addItemToCart);

router.put('/:cartUuid/item/:uuid', checkCart, checkItem, controller.updateItem);

router.delete('/:cartUuid/item/:uuid', checkCart, checkItem, controller.RemoveItemFromCart);

module.exports = router;
