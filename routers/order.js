const express = require('express');
const router = express.Router();
const { checkOrder, checkCart, checkAdmin } = require('./middleware');
const controller = require('./controller/order');

router.post('/', checkCart, controller.createOrder);

router.get('/:uuid', checkOrder, controller.findOrder);

router.put('/:uuid/:status', checkAdmin, checkOrder, controller.updateOrder);

router.delete('/:uuid', checkAdmin, checkOrder, controller.deleteOrder);

module.exports = router;
