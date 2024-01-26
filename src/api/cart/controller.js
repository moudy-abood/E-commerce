const { cartServices, itemServices } = require('../../services');
const { StatusCodes } = require('http-status-codes');

async function createCart(req, res) {
  const { id } = req.user;
  try {
    await cartServices.create({ userId: id });
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function getCart(req, res) {
  const { id } = req.user;
  try {
    const cart = await cartServices.getUserExposedCart(id);
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function addItemToCart(req, res) {
  const { id: cartId } = req.cart;
  const { uuid } = req.cart;
  try {
    await cartServices.updateCartStatus({ status: 'INCOMPLETE' }, uuid);
    const items = req.body.map(e => {
      e.cartId = cartId;
      return e;
    });
    await itemServices.addItemsToCart(items);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateItem(req, res) {
  const { uuid } = req.params;
  const { quantity } = req.body;
  try {
    await itemServices.update(quantity, uuid);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function RemoveItemFromCart(req, res) {
  const { uuid } = req.params;
  try {
    await itemServices.removeItem(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createCart, getCart, addItemToCart, updateItem, RemoveItemFromCart };

module.exports = controller;
