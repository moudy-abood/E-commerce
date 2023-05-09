const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkAdmin } = require('../../middleware');
const validate = require('./validator');
const { errors } = require('celebrate');

router.post('/', validate, controller.createUser);

router.put('/', auth, validate, controller.updateUser);

router.get('/profile', auth, controller.getUser);

router.delete('/:uuid', auth, checkAdmin, controller.deleteUser);

router.use(errors());

module.exports = router;
