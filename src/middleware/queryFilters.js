const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const definedOperations = {
  and: Op.and,
  or: Op.or,
  not: Op.not,
  notIn: Op.notIn,
  eq: Op.eq,
  like: Op.like
};
async function queryFilters(req, res, next) {
  try {
    const queryFilters = {};
    const { filterParameters } = req.query;
    Array.isArray(filterParameters) &&
      filterParameters.length &&
      filterParameters.forEach(option => {
        if (definedOperations[option.op]) {
          queryFilters[option.key] = {
            [definedOperations[option.op]]: option.value
          };
        }
      });
    req.queryOptions = queryFilters;
    return next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = queryFilters;
