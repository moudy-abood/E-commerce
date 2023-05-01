const express = require('express');
const router = express.Router();
const { auth, checkOrder, checkCart, checkAdmin } = require('./middleware');
const controller = require('./controller/order');

router.post('/', auth, checkCart, controller.createOrder);

router.get('/:uuid', auth, checkOrder, controller.findOrder);

router.put('/:uuid/:status', auth, checkAdmin, checkOrder, controller.updateOrder);

router.delete('/:uuid', auth, checkAdmin, checkOrder, controller.deleteOrder);

module.exports = router;
