const express = require('express');
const router = express.Router();
const { checkOrder, checkCart, checkAdmin, checkUser } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', validator.create, checkCart, checkUser, controller.createOrder);

router.get('/:uuid', validator.uuid, checkOrder, checkUser, controller.getOrder);

router.put(
  '/:uuid/:status',
  validator.uuid,
  validator.update,
  checkAdmin,
  checkOrder,
  checkUser,
  controller.updateOrder
);

router.delete('/:uuid', validator.uuid, checkAdmin, checkOrder, controller.deleteOrder);

module.exports = router;
