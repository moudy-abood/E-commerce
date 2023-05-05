const { StatusCodes } = require('http-status-codes');
const { orderServices, cartServices } = require('../../services');

async function createOrder(req, res) {
  const { cartUuid } = req.body;
  const { id } = req.cart;
  try {
    await cartServices.update({ status: 'COMPLETED' }, cartUuid);
    await orderServices.create({ ...req.body, cartId: id });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findOrder(req, res) {
  const { uuid } = req.params;
  try {
    const order = await orderServices.findOne(uuid);
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
    await orderServices.update(status, uuid);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteOrder(req, res) {
  const { uuid } = req.params;
  try {
    await orderServices.remove(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createOrder, findOrder, updateOrder, deleteOrder };

module.exports = controller;
