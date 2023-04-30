const express = require('express');
const router = express.Router();
const { auth, checkOrder, checkCart, checkAdmin } = require('./middleware');
const { createOrder, findOrder, updateOrder, deleteOrder } = require('./controller/order');

router.post('/', auth, checkCart, createOrder);

router.get('/:uuid', auth, checkOrder, findOrder);

router.put('/:uuid/:status', auth, checkAdmin, checkOrder, updateOrder);

router.delete('/:uuid', auth, checkAdmin, checkOrder, deleteOrder);

module.exports = router;
