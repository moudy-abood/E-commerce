const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { checkProduct, auth, checkAdmin } = require('./middleware');

router.post('/', auth, checkAdmin, async (req, res) => {
  try {
    const product = await models.Product.bulkCreate([...req.body]);
    return res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/', async (req, res) => {
  try {
    await models.Product.findAll();
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:uuid', async (req, res) => {
  const { uuid } = req.params;
  try {
    const product = await models.Product.findOne({ where: { uuid } });
    return res.status(StatusCodes.OK).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:uuid', checkProduct, auth, checkAdmin, async (req, res) => {
  const { uuid } = req.params;
  const data = req.body;
  try {
    await models.Product.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:uuid', checkProduct, auth, checkAdmin, async (req, res) => {
  const { uuid } = req.params;
  try {
    await models.Product.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
