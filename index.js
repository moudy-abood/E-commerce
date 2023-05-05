require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src');
const port = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('sever is up on port ' + port);
});
