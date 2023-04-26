const express = require('express');
const models = require('../models');
const router = express.Router();
const { StatusCodes } = require('http-status-codes');
const { auth, checkOrder, checkCart, checkAdmin } = require('./middleware');

router.post('/', auth, checkCart, async (req, res) => {
  const { cartUuid } = req.body;
  try {
    await models.Cart.update({ status: 'COMPLETED' }, { where: { uuid: cartUuid } });
    await models.Order.create({ ...req.body });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.get('/:uuid', auth, checkOrder, async (req, res) => {
  const { uuid } = req.params;
  try {
    const order = await models.Order.findOne({
      where: { uuid },
      include: {
        model: models.Cart,
        include: { model: models.Item, include: { model: models.Product } }
      },
      nest: true,
      raw: true
    });
    order.items = order.Cart.Items;
    delete order.Cart;

    return res.status(StatusCodes.OK).send(order);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.put('/:uuid/:status', auth, checkAdmin, checkOrder, async (req, res) => {
  const { uuid } = req.params;
  const { status } = req.params;
  try {
    await models.Order.update(
      { status: status },
      {
        where: { uuid },
        include: {
          model: models.Cart,
          include: { model: models.Item, include: { model: models.Product } }
        }
      }
    );
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

router.delete('/:uuid', auth, checkAdmin, checkOrder, async (req, res) => {
  const { uuid } = req.params;
  try {
    await models.Order.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
});

module.exports = router;
