const express = require('express');
const routes = express();

const userRouter = require('./user');
const addressRouter = require('./address');

routes.use(userRouter);
routes.use('/address', addressRouter);

module.exports = routes;
