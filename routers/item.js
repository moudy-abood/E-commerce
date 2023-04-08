const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkItem } = require('./middleware');

router.post('/cart/:id/item', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await models.Cart.findOne({ where: { id } });
    await models.Cart.update({ status: 'INCOMPLETE' }, { where: { id } });
    const items = req.body.map(e => {
      e.cartId = cart.id;
      return e;
    });
    const item = await models.Item.bulkCreate(items);
    return res.status(StatusCodes.OK).send(item);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/item/:id', auth, checkItem, async (req, res) => {
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

router.delete('/item/:id', auth, checkItem, async (req, res) => {
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
