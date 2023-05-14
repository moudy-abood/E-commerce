const express = require('express');
const router = express.Router();
const { checkAvailableCart, checkItem, checkCart, checkUser } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', checkAvailableCart, controller.createCart);

router.get('/:cartUuid', validator.uuid, checkCart, checkUser, controller.getCart);

router.post(
  '/:cartUuid/item',
  validator.uuid,
  validator.create,
  checkCart,
  checkUser,
  controller.addItemToCart
);

router.put(
  '/:cartUuid/item/:uuid',
  validator.uuid,
  checkCart,
  checkItem,
  checkUser,
  controller.updateItem
);

router.delete(
  '/:cartUuid/item/:uuid',
  validator.uuid,
  checkCart,
  checkItem,
  checkUser,
  controller.RemoveItemFromCart
);

module.exports = router;
