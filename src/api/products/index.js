const express = require('express');
const router = express.Router();
const { checkProduct, auth, checkAdmin } = require('../../middleware');
const controller = require('./controller');
const validator = require('./validator');

router.post('/', validator.create, auth, checkAdmin, controller.createProducts);

router.get('/', controller.listAllProducts);

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
