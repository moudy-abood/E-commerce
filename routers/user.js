const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const tokenGen = require('../utils/token');
const auth = require('./middleware/auth');

router.post('/', async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/', auth, async (req, res) => {
  const data = req.body;
  const { userId: id } = req.token;
  try {
    await models.User.update(data, { where: { id } });
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
router.delete('/', auth, async (req, res) => {
  const { userId: id } = req.token;
  try {
    await models.User.destroy({ where: { id } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
