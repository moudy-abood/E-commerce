const express = require('express');
const router = express.Router();
const { checkAddress, checkUser } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');
const { errors } = require('celebrate');

router.post('/', validator.create, controller.createAddress);

router.get('/', controller.listUserAddresses);

router.get('/:uuid', validator.uuid, checkAddress, checkUser, controller.getUserAddress);

router.put(
  '/:uuid',
  validator.uuid,
  validator.update,
  checkAddress,
  checkUser,
  controller.updateAddress
);

router.delete('/:uuid', validator.uuid, checkAddress, checkUser, controller.deleteAddress);

router.use(errors());

module.exports = router;
