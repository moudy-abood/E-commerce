const express = require('express');
const router = express.Router();
const { checkProduct, auth, checkAdmin } = require('../../middleware');
const controller = require('./controller');

router.post('/', auth, checkAdmin, controller.createProducts);

router.get('/', controller.listAllProducts);

router.get('/:uuid', checkProduct, controller.findProduct);

router.put('/:uuid', checkProduct, auth, checkAdmin, controller.updateProduct);

router.delete('/:uuid', checkProduct, auth, checkAdmin, controller.deleteProduct);

module.exports = router;
