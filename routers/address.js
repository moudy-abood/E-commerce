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
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const addresses = await models.Address.findAll();
    return res.status(StatusCodes.OK).send(addresses);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:uuid', auth, checkAddress, async (req, res) => {
  const { uuid } = req.params;
  try {
    const address = await models.Address.findOne({ where: { uuid } });
    return res.status(StatusCodes.OK).send(address);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:uuid', auth, checkAddress, async (req, res) => {
  const { uuid } = req.params;
  const data = req.body;
  try {
    await models.Address.update(data, { where: { uuid } });
    return res.status(StatusCodes.OK).send(data);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:uuid', auth, checkAddress, async (req, res) => {
  const { uuid } = req.params;
  try {
    await models.Address.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
