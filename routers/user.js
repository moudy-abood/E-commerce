const express = require('express');
const router = express.Router();
const controller = require('./controller/user');
const { auth, checkAdmin } = require('./middleware');

router.post('/', controller.createUser);

router.put('/', auth, controller.UpdateUser);

router.get('/profile', auth, controller.getUser);

router.delete('/:uuid', auth, checkAdmin, controller.deleteUser);

module.exports = router;
