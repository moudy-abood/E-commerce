const { StatusCodes } = require('http-status-codes');
const { productServices } = require('../../services');
const { queryMapper } = require('../../utils/helpers');

async function createProducts(req, res) {
  try {
    await productServices.createProducts([...req.body]);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function listAllProducts(req, res) {
  try {
    const { page, pageSize, offset } = await queryMapper(req.query);
    const products = await productServices.getAll(page, pageSize, offset);
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function allProducts(req, res) {
  try {
    const option = req.queryOptions;
    const { page, pageSize } = await queryMapper(req.query);
    const products = await productServices.listProducts(option, page, pageSize);
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function findProduct(req, res) {
  const { uuid } = req.params;
  try {
    const product = await productServices.getOne(uuid);
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
    await productServices.removeProduct(uuid);
    return res.status(StatusCodes.OK).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

const controller = {
  createProducts,
  listAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  allProducts
};

module.exports = controller;
