const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkAdmin, checkEmail } = require('../../middleware');
const validator = require('./validator');
const { errors } = require('celebrate');

router.post('/', validator.create, checkEmail, controller.createUser);

router.put('/', validator.update, auth, checkEmail, controller.updateUser);

router.get('/', auth, controller.getUser);

router.delete('/:uuid', auth, validator.uuid, checkAdmin, controller.deleteUser);

router.use(errors());

module.exports = router;
