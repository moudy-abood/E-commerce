const express = require('express');
const router = express.Router();
const { auth, checkAddress } = require('./middleware');
const controller = require('./controller/address');

router.post('/', auth, controller.createAddress);

router.get('/', auth, controller.listUserAddresses);

router.get('/:uuid', auth, checkAddress, controller.getUserAddress);

router.put('/:uuid', auth, checkAddress, controller.updateAddress);

router.delete('/:uuid', auth, checkAddress, controller.deleteAddress);

module.exports = router;
