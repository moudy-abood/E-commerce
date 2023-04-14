const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkOrder } = require('./middleware');

router.post('/', auth, async (req, res) => {
  const { userId } = req.token;
  const { cartId } = req.body;
  try {
    const cart = await models.Cart.findOne({ where: { id: userId } });
    if (cart.id !== cartId) {
      return res.status(StatusCodes.NOT_FOUND).send();
    }
    if (req.body.total === 0) {
      return res.status(StatusCodes.NOT_ACCEPTABLE).send();
    }
    await models.Cart.update({ status: 'COMPLETED' }, { where: { id: cartId } });
    const order = await models.Order.create({ ...req.body });
    return res.status(StatusCodes.CREATED).send(order);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:id', auth, checkOrder, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await models.Order.findOne({
      where: { id },
      include: { model: models.Cart, include: { model: models.Item } }
    });
    return res.status(StatusCodes.OK).send(order);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
