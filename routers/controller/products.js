const { StatusCodes } = require('http-status-codes');
const { productServices } = require('../../services');

async function createProducts(req, res) {
  try {
    const product = await productServices.bulkCreate([...req.body]);
    return res.status(StatusCodes.CREATED).send(product);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function listAllProducts(req, res) {
  try {
    const products = await productServices.findAll();
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findProduct(req, res) {
  const { uuid } = req.params;
  try {
    const product = await productServices.findOne(uuid);
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
    await productServices.update(data, uuid);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function deleteProduct(req, res) {
  const { uuid } = req.params;
  try {
    await productServices.remove(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = { createProducts, listAllProducts, findProduct, updateProduct, deleteProduct };

module.exports = controller;
