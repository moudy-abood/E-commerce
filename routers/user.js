const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

router.post('/user', async (req, res) => {
  try {
    const user = await models.User.create({ ...req.body });
    return res.status(StatusCodes.CREATED).send(user);
  } catch (e) {
    res.status(401).send();
  }
});

router.get('/user/:id', async (req, res) => {
  const { id: _id } = req.params;
  // const { params: {
  //   id: _id
  // }} = req;
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
    await models.User.destroy({ where: { id: _id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

module.exports = router;
