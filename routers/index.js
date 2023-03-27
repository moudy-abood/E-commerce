const express = require('express');
const routes = express();

const userRouter = require('./user');
const addressRouter = require('./address');
const productRouter = require('./products');
const cartRouter = require('./cart');

routes.use('/user', userRouter);
routes.use('/address', addressRouter);
routes.use('/product', productRouter);
routes.use('/cart', cartRouter);

module.exports = routes;
