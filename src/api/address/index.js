const express = require('express');
const router = express.Router();
const { checkAddress } = require('../../middleware');
const controller = require('./controller');
const validate = require('./validator');
const { errors } = require('celebrate');

router.post('/', validate, controller.createAddress);

router.get('/', controller.listUserAddresses);

router.get('/:uuid', checkAddress, controller.getUserAddress);

router.put('/:uuid', validate, checkAddress, controller.updateAddress);

router.delete('/:uuid', checkAddress, controller.deleteAddress);

router.use(errors());

module.exports = router;
