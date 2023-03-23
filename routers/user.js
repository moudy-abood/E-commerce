const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const tokenGen = require('../utils/token');
const auth = require('./middleware/auth');

router.post('/user', async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

router.put('/user', auth, async (req, res) => {
  const data = req.body;
  const { userId: id } = req.token;
  try {
    await models.User.update(data, { where: { id } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await models.User.findOne();
    res.status(StatusCodes.OK).send(user);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});
router.delete('/user', auth, async (req, res) => {
  const { userId: id } = req.token;
  try {
    await models.User.destroy({ where: { id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

module.exports = router;
