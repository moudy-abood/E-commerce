const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const auth = require('./middleware/auth');

router.post('/', auth, async (req, res) => {
  const { userId } = req.token;
  try {
    const address = await models.Address.create({ ...req.body, userId });
    return res.status(StatusCodes.CREATED).send(address);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const addresses = await models.Address.findAll();
    res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/:addressId', auth, async (req, res) => {
  const _id = req.params;
  try {
    const address = await models.Address.findOne({ where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send(address);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.put('/:addressId', auth, async (req, res) => {
  const _id = req.params;
  const data = req.body;
  try {
    await models.Address.update(data, { where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.delete('/:addressId', auth, async (req, res) => {
  const _id = req.params;
  try {
    const addressId = await models.Address.findOne({ where: { id: _id.addressId } });
    if (!addressId) {
      throw new Error(res.status(StatusCodes.NO_CONTENT));
    }
    await models.Address.destroy({ where: { id: _id.addressId } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

module.exports = router;
