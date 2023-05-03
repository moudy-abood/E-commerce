const express = require('express');
const routes = express();
const { auth } = require('../routers/middleware')

const userRouter = require('./user');
const addressRouter = require('./address');
const productRouter = require('./products');
const cartRouter = require('./cart');
const orderRouter = require('./order');

routes.use('/user', userRouter);
routes.use('/address', auth, addressRouter);
routes.use('/product', productRouter);
routes.use('/cart', auth, cartRouter);
routes.use('/order', auth, orderRouter);

module.exports = routes;
