const express = require('express');
const router = express.Router();
const { checkOrder, checkCart, checkAdmin } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', checkCart, validator, controller.createOrder);

router.get('/:uuid', checkOrder, controller.getOrder);

router.put('/:uuid/:status', checkAdmin, checkOrder, controller.updateOrder);

router.delete('/:uuid', checkAdmin, checkOrder, controller.deleteOrder);

module.exports = router;
