const express = require('express');
const router = express.Router();
const { checkOrder, checkCart, checkAdmin } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');
const getAddress = require('../../middleware/getAddress');

router.post('/', validator.create, checkCart, getAddress, controller.createOrder);

router.get('/', controller.listOrders);

router.get('/:uuid', validator.uuid, checkOrder, controller.getOrder);

router.put(
  '/:uuid/:status',
  validator.uuid,
  validator.update,
  checkAdmin,
  checkOrder,
  controller.updateOrder
);

router.delete('/:uuid', validator.uuid, checkAdmin, checkOrder, controller.deleteOrder);

module.exports = router;
