const models = require('../../models');
const { StatusCodes } = require('http-status-codes');

async function createCart(req, res) {
  const { id } = req.user;
  try {
    await models.Cart.create({ userId: id });
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
    await models.Cart.update({ status: 'INCOMPLETE' }, { where: { uuid: cartUuid } });
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
}

async function updateItem(req, res) {
  const { uuid } = req.params;
  const { quantity } = req.body;
  try {
    await models.Item.update({ quantity }, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function RemoveItemFromCart(req, res) {
  const { uuid } = req.params;
  try {
    await models.Item.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createCart, getCart, addItemToCart, updateItem, RemoveItemFromCart };

module.exports = controller;
