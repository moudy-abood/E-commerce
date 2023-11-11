const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
const { checkUser } = require('../../middleware');
const { errors } = require('celebrate');

router.post('/login', validator.login, checkUser, controller.login);

router.use(errors());

module.exports = router;
