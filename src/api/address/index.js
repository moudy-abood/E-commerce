const express = require('express');
const router = express.Router();
const { checkAddress } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');
const { errors } = require('celebrate');

router.post('/', validator.create, controller.createAddress);

router.get('/', controller.listUserAddresses);

router.get('/:uuid', validator.uuid, checkAddress, controller.getUserAddress);

router.put('/:uuid', validator.uuid, validator.update, checkAddress, controller.updateAddress);

router.delete('/:uuid', validator.uuid, checkAddress, controller.deleteAddress);

router.use(errors());

module.exports = router;
