const { cartServices, itemServices } = require('../../services');
const { StatusCodes } = require('http-status-codes');
const models = require('../../models');

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
  const { cartUuid } = req.params;
  try {
    const cart = await models.Cart.findOne({
      where: { uuid: cartUuid },
      include: { model: models.Item, include: { model: models.Product } },
      attributes: { exclude: ['id'] }
    });
    return res.status(StatusCodes.OK).send(cart);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function addItemToCart(req, res) {
  const { cartUuid } = req.params;
  const { id: cartId } = req.cart;
  try {
    await cartServices.update({ status: 'INCOMPLETE' }, { where: { uuid: cartUuid } });
    const items = req.body.map(e => {
      e.cartId = cartId;
      return e;
    });
    await itemServices.bulkCreate(items);
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
    await itemServices.update({ quantity }, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function RemoveItemFromCart(req, res) {
  const { uuid } = req.params;
  try {
    await itemServices.remove({ where: { uuid } });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createCart, getCart, addItemToCart, updateItem, RemoveItemFromCart };

module.exports = controller;
