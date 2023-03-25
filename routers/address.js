const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkAddress } = require('./middleware');

router.post('/', auth, async (req, res) => {
  const { userId } = req.token;
  try {
    await models.Address.create({ ...req.body, userId });
    return res.status(StatusCodes.CREATED).send();
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

router.get('/:id', auth, checkAddress, async (req, res) => {
  const { id } = req.params;
  try {
    const address = await models.Address.findOne({ where: { id } });
    res.status(StatusCodes.OK).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:id', auth, checkAddress, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await models.Address.update(data, { where: { id } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:id', auth, checkAddress, async (req, res) => {
  const { id } = req.params;
  try {
    await models.Address.destroy({ where: { id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
