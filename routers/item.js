const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkItem } = require('./middleware');

router.post('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.token;
  try {
    const product = await models.Product.findOne({ where: { id } });
    const cart = await models.Cart.findOne({ where: { userId } });
    const item = await models.Item.create({ ...req.body, productId: product.id, cartId: cart.id });
    return res.status(StatusCodes.OK).send(item);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:id', auth, checkItem, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await models.Item.update(data, { where: { id } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:id', auth, checkItem, async (req, res) => {
  const { id } = req.params;
  try {
    await models.Item.destroy({ where: { id } });
    res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
