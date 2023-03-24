const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');

router.post('/', async (req, res) => {
  try {
    const product = await models.Product.bulkCreate([...req.body]);
    res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/', async (req, res) => {
  try {
    const product = await models.Product.findAll();
    res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await models.Product.findOne({ where: { id: _id } });
    res.status(StatusCodes.OK).send(product);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.put('/:id', async (req, res) => {
  const _id = req.params.id;
  const data = req.body;
  try {
    await models.Product.update(data, { where: { id: _id } });
    res.status(StatusCodes.OK).send(data);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.delete('/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const productId = await models.Product.findOne({ where: { id: _id } });
    if (!productId) {
      throw new Error('not found');
    }
    await models.Product.destroy({ where: { id: _id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

module.exports = router;
