require('dotenv').config();
const express = require('express');
const app = express();

const userRouter = require('./routers/user');
const addressRouter = require('./routers/address');
const port = process.env.PORT;

app.use(express.json());

app.use(userRouter);
app.use('/address', addressRouter);
app.listen(port, () => {
  console.log('sever is up on port ' + port);
});
