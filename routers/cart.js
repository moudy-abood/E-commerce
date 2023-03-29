const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth } = require('./middleware');

router.post('/', auth, async (req, res) => {
  const { userId } = req.token;
  try {
    await models.Cart.create({ userId });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e || e.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/', auth, async (req, res) => {
  const { userId } = req.token;
  try {
    const cart = await models.Cart.findOne({ where: { userId } });
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e || e.message;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
