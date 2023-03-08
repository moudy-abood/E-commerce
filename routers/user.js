const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const tokenGen = require('../utils/token');

router.post('/user', async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body });
    const token = tokenGen({ userId: user.id });
    return res.status(StatusCodes.CREATED).send({ token });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

router.get('/user/:id', async (req, res) => {
  const { id: _id } = req.params;
  try {
    const user = await models.User.findOne({ where: { id: _id } });
    res.status(StatusCodes.OK).send(user);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

router.put('/user/:id', async (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  try {
    await models.User.update(data, { where: { id: _id } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

router.delete('/user/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const userId = await models.User.findOne({ where: { id: _id } });
    if (!userId) return res.status(StatusCodes.NOT_FOUND).send();
    await models.User.destroy({ where: { id: _id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).send();
  }
});

module.exports = router;
