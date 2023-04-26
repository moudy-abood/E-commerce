const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const tokenGen = require('../utils/token');
const { auth, checkAdmin } = require('./middleware');

router.post('/', async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body });
    const token = tokenGen({ userId: user.uuid });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/', auth, async (req, res) => {
  const data = req.body;
  const { userId: uuid } = req.token;
  try {
    await models.User.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await models.User.findOne();
    return res.status(StatusCodes.OK).send(user);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});
router.delete('/:uuid', auth, checkAdmin, async (req, res) => {
  const { uuid } = req.params;
  try {
    await models.User.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
