const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const { hashedPassword } = require('../../middleware');
const { errors } = require('celebrate');

router.post('/register', validator.create, hashedPassword, controller.createUser);

router.post('/login', validator.login, controller.login);

router.use(errors());

module.exports = router;
