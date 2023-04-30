const express = require('express');
const router = express.Router();
const { createUser, UpdateUser, findUser, deleteUser } = require('./controller/user');
const { auth, checkAdmin } = require('./middleware');

router.post('/', createUser);

router.put('/', auth, UpdateUser);

router.get('/profile', auth, findUser);

router.delete('/:uuid', auth, checkAdmin, deleteUser);

module.exports = router;
