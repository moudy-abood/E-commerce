const { StatusCodes } = require('http-status-codes');
const models = require('../../models');

async function createOrder(req, res) {
  const { cartUuid } = req.body;
  const { id } = req.cart;
  try {
    await models.Cart.update({ status: 'COMPLETED' }, { where: { uuid: cartUuid } });
    await models.Order.create({ ...req.body, cartId: id });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findOrder(req, res) {
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
}

async function updateOrder(req, res) {
  const { uuid } = req.params;
  const { status } = req.params;
  try {
    await models.Order.update({ status }, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteOrder(req, res) {
  const { uuid } = req.params;
  try {
    await models.Order.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = { createOrder, findOrder, updateOrder, deleteOrder };
