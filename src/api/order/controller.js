const { StatusCodes } = require('http-status-codes');
const { orderServices, cartServices } = require('../../services');

async function createOrder(req, res) {
  const { id, uuid } = req.cart;
  const { addressId } = req;
  const userId = req.user.id;
  try {
    await cartServices.updateCartStatus({ status: 'COMPLETED' }, uuid);
    await orderServices.create({ ...req.body, cartId: id, addressId, userId });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getOrder(req, res) {
  const { uuid } = req.params;
  try {
    const order = await orderServices.findOne(uuid);
    order.dataValues.items = order.Cart.Items;
    delete order.dataValues.Cart;
    order.dataValues.Address = order.Address || order.temporaryAddress;
    delete order.dataValues.temporaryAddress;
    return res.status(StatusCodes.OK).send(order);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function listOrders(req, res) {
  const { id } = req.user;
  try {
    const orders = await orderServices.findAll(id);
    orders.map(order => {
      order.dataValues.items = order.Cart.Items;
      delete order.dataValues.Cart;
      order.dataValues.Address = order.Address || order.temporaryAddress;
      delete order.dataValues.temporaryAddress;
    });
    return res.status(StatusCodes.OK).send(orders);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateOrder(req, res) {
  const { status, uuid } = req.params;
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
    await orderServices.removeOrder(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createOrder, getOrder, updateOrder, deleteOrder, listOrders };

module.exports = controller;
