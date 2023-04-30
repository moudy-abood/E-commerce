const express = require('express');
const router = express.Router();
const { auth, checkAddress } = require('./middleware');
const {
  createAddress,
  findAllAddresses,
  findAddress,
  updateAddress,
  deleteAddress
} = require('./controller/address');

router.post('/', auth, createAddress);

router.get('/', auth, findAllAddresses);

router.get('/:uuid', auth, checkAddress, findAddress);

router.put('/:uuid', auth, checkAddress, updateAddress);

router.delete('/:uuid', auth, checkAddress, deleteAddress);

module.exports = router;
