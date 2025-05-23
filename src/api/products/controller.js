const { StatusCodes } = require('http-status-codes');
const { productServices } = require('../../services');

async function createProducts(req, res) {
  try {
    await productServices.createProducts([...req.body]);
    return res.status(StatusCodes.CREATED).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function allProducts(req, res) {
  try {
    const option = req.queryOptions;
    const products = await productServices.listProducts(option);
    return res.status(StatusCodes.OK).send(products);
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

async function allCategories(req, res) {
  try {
    const categories = await productServices.listCategories();
    return res.status(StatusCodes.OK).send(categories);
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
  findProduct,
  updateProduct,
  deleteProduct,
  allProducts,
  allCategories
};

module.exports = controller;
