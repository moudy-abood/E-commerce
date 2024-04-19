async function productDataMapper(result, page, pageSize) {
  return {
    products: result.rows,
    totalCount: result.count,
    totalPages: Math.ceil(result.count / pageSize),
    currentPage: page
  };
}

async function queryMapper(query) {
  const page = query.page || 1;
  const pageSize = query.pageSize || 10;
  const offset = (page - 1) * pageSize;
  return {
    page,
    pageSize,
    offset
  };
}

module.exports = { productDataMapper, queryMapper };
