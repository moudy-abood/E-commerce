require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./api');
const port = process.env.PORT;
const { errors } = require('celebrate');

app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(port, () => {
  console.log('sever is up on port ' + port);
});
