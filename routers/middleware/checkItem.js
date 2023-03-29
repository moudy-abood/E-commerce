const { StatusCodes } = require('http-status-codes');
const { Item } = require('../../models');

async function checkItem(req, res, next) {
  const { id } = req.params;
  try {
    const item = await Item.findOne({ where: { id } });
    req.item = item;
    return item ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
  }
}

module.exports = checkItem;
