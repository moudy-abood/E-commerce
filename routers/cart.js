const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkAvailableCart } = require('./middleware');

router.post('/', auth, checkAvailableCart, async (req, res) => {
  const { userId } = req.token;
  try {
    await models.Cart.create({ userId });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e || e.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await models.Cart.findOne({ where: { id } });
    return res.status(StatusCodes.OK).send(cart.status);
  } catch (e) {
    const errorMessage = e || e.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
