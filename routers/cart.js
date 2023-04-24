const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkAvailableCart, checkItem, checkCart } = require('./middleware');

router.post('/', auth, checkAvailableCart, async (req, res) => {
  const { userId } = req.token;
  try {
    await models.Cart.create({ userId });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:cartId', auth, checkCart, async (req, res) => {
  const { cartId } = req.params;
  try {
    const cart = await models.Cart.findOne({
      where: { id: cartId },
      include: { model: models.Item, include: { model: models.Product } }
    });
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.post('/:cartId/item', auth, checkCart, async (req, res) => {
  const { cartId } = req.params;
  try {
    await models.Cart.update({ status: 'INCOMPLETE' }, { where: { id: cartId } });
    const items = req.body.map(e => {
      e.cartId = cartId;
      return e;
    });
    await models.Item.bulkCreate(items);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:cartId/item/:id', auth, checkCart, checkItem, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    await models.Item.update({ quantity }, { where: { id } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:cartId/item/:id', auth, checkCart, checkItem, async (req, res) => {
  const { id } = req.params;
  try {
    await models.Item.destroy({ where: { id } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
