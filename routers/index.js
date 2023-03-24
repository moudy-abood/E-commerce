const express = require('express');
const routes = express();

const userRouter = require('./user');
const addressRouter = require('./address');
const productRouter = require('./products');

routes.use(userRouter);
routes.use('/address', addressRouter);
routes.use('/product', productRouter);

module.exports = routes;
