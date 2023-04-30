const { StatusCodes } = require('http-status-codes');
const models = require('../../models');

async function createProducts(req, res) {
  try {
    const product = await models.Product.bulkCreate([...req.body]);
    return res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findProducts(req, res) {
  try {
    const products = await models.Product.findAll();
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findProduct(req, res) {
  const { uuid } = req.params;
  try {
    const product = await models.Product.findOne({ where: { uuid } });
    return res.status(StatusCodes.OK).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function updateProduct(req, res) {
  const { uuid } = req.params;
  const data = req.body;
  try {
    await models.Product.update(data, { where: { uuid } });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteProduct(req, res) {
  const { uuid } = req.params;
  try {
    await models.Product.destroy({ where: { uuid } });
    return res.status(StatusCodes.OK).send('deleted');
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = { createProducts, findProducts, findProduct, updateProduct, deleteProduct };
