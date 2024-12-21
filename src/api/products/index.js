const express = require('express');
const router = express.Router();
const { checkProduct, auth, checkAdmin, queryFilters } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', validator.create, auth, checkAdmin, controller.createProducts);

router.get('/', controller.listAllProducts);

router.get('/all', controller.listAll);

router.get('/list', queryFilters, controller.allProducts);

router.get('/category', controller.allByCategory);

router.get('/:uuid', validator.uuid, checkProduct, controller.findProduct);

router.put(
  '/:uuid',
  validator.uuid,
  validator.update,
  checkProduct,
  auth,
  checkAdmin,
  controller.updateProduct
);

router.delete('/:uuid', validator.uuid, checkProduct, auth, checkAdmin, controller.deleteProduct);

module.exports = router;
