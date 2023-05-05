const express = require('express');
const router = express.Router();
const { checkAddress } = require('../../middleware');
const controller = require('./controller');

router.post('/', controller.createAddress);

router.get('/', controller.listUserAddresses);

router.get('/:uuid', checkAddress, controller.getUserAddress);

router.put('/:uuid', checkAddress, controller.updateAddress);

router.delete('/:uuid', checkAddress, controller.deleteAddress);

module.exports = router;
