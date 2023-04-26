const { StatusCodes } = require('http-status-codes');
const { Item } = require('../../models');

async function checkItem(req, res, next) {
  const { uuid } = req.params;
  try {
    const item = await Item.findOne({ where: { uuid } });
    req.item = item;
    return item ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkItem;
