const express = require('express');
const router = express.Router();
const { checkProduct, auth, checkAdmin } = require('./middleware');
const {
  createProducts,
  findProducts,
  findProduct,
  updateProduct,
  deleteProduct
} = require('./controller/products');

router.post('/', auth, checkAdmin, createProducts);

router.get('/', findProducts);

router.get('/:uuid', findProduct);

router.put('/:uuid', checkProduct, auth, checkAdmin, updateProduct);

router.delete('/:uuid', checkProduct, auth, checkAdmin, deleteProduct);

module.exports = router;
