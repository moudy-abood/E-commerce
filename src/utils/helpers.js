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
  return {
    page,
    pageSize
  };
}

module.exports = { productDataMapper, queryMapper };
