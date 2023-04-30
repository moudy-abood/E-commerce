const express = require('express');
const router = express.Router();
const { auth, checkAvailableCart, checkItem, checkCart } = require('./middleware');
const { createCart, findCart, createItem, updateItem, deleteItem } = require('./controller/cart');

router.post('/', auth, checkAvailableCart, createCart);

router.get('/:cartUuid', auth, checkCart, findCart);

router.post('/:cartUuid/item', auth, checkCart, createItem);

router.put('/:cartUuid/item/:uuid', auth, checkCart, checkItem, updateItem);

router.delete('/:cartUuid/item/:uuid', auth, checkCart, checkItem, deleteItem);

module.exports = router;
