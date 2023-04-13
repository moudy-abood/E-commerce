const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { checkProduct } = require('./middleware');

router.post('/', async (req, res) => {
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

router.get('/:id', checkProduct, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findOne({ where: { id } });
    return res.status(StatusCodes.OK).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:id', checkProduct, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await models.Product.update(data, { where: { id } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:id', checkProduct, async (req, res) => {
  const { id } = req.params;
  try {
    await models.Product.destroy({ where: { id } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
