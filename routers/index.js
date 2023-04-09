const express = require('express');
const routes = express();

const userRouter = require('./user');
const addressRouter = require('./address');
const productRouter = require('./products');
const cartRouter = require('./cart');
const orderRouter = require('./order');

routes.use('/user', userRouter);
routes.use('/address', addressRouter);
routes.use('/product', productRouter);
routes.use('/cart', cartRouter);
routes.use('/order', orderRouter);

module.exports = routes;
