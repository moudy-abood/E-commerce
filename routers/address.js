const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const auth = require('./middleware/auth');

router.post('/address', auth, async (req, res) => {
  const { userId } = req.token;
  try {
    const address = await models.Address.create({ ...req.body, userId });
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
});

router.get('/', async (req, res) => {
  const _id = req.params.id;
  try {
    const userId = await models.User.findOne({ where: { id: _id } });
    if (!userId) {
      throw new Error();
    }
    const addresses = await models.Address.findAll({ where: { userId: userId.id } });
    res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

router.get('/address/:userId/:addressId', async (req, res) => {
  const _id = req.params;
  try {
    const userId = await models.User.findOne({ where: { id: _id.userId } });
    if (!userId) {
      throw new Error();
    }
    const address = await models.Address.findOne({ where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send(address);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

router.put('/address/:userId/:addressId', async (req, res) => {
  const _id = req.params;
  const data = req.body;
  try {
    const userId = await models.User.findOne({ where: { id: _id.userId } });
    if (!userId) {
      throw new Error();
    }
    await models.Address.update(data, { where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

router.delete('/address/:userId/:addressId', async (req, res) => {
  const _id = req.params;
  try {
    const userId = await models.User.findOne({ where: { id: _id.userId } });
    if (!userId) {
      throw new Error();
    }
    const addressId = await models.Address.findOne({ where: { id: _id.addressId } });
    if (!addressId) {
      throw new Error();
    }
    await models.Address.destroy({ where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).send();
  }
});

module.exports = router;
