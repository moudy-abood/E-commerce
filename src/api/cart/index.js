const express = require('express');
const router = express.Router();
const { checkAvailableCart, checkItem, checkCart } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', checkAvailableCart, controller.createCart);

router.get('/', checkCart, controller.getCart);

router.post(
  '/:cartUuid/item',
  validator.uuid,
  validator.create,
  checkCart,
  controller.addItemToCart
);

router.put('/:cartUuid/item/:uuid', validator.uuid, checkCart, checkItem, controller.updateItem);

router.delete(
  '/:cartUuid/item/:uuid',
  validator.uuid,
  checkCart,
  checkItem,
  controller.RemoveItemFromCart
);

module.exports = router;
