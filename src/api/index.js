const express = require('express');
const routes = express();
const { auth } = require('../middleware');

const userRouter = require('../api/user');
const addressRouter = require('../api/address');
const productRouter = require('../api/products');
const cartRouter = require('../api/cart');
const orderRouter = require('../api/order');

routes.use('/user', userRouter);
routes.use('/address', auth, addressRouter);
routes.use('/product', productRouter);
routes.use('/cart', auth, cartRouter);
routes.use('/order', auth, orderRouter);

module.exports = routes;
