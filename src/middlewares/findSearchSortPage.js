"use strict";

module.exports = (req, res, next) => {
  /* FILTERING & SEARCHING & SORTING & PAGINATION */

  // FILTER
  // URL?filter[key1]=value1&filter[key2]=value2
  const filter = req.query?.filter || {};

  //SEARCH
  // URL?search[key1]=value1&search[key2]=value2
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  const search = req.query?.search || {};

  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" };
  }

  // SORT
  // URL?sort[key1]=asc&sort[key2]=desc
  // 1: A-Z - -1: Z-A //deprecated
  // asc: A-Z - desc: Z-A
  const sort = req.query?.sort || {};

  // PAGINATION
  // URL?page=3&limit=10

  // Limit
  let limit = Number(req.query?.limit);
  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  // Page
  let page = Number(req.query?.page);
  // page = page > 0 ? page : 1;
  page = page > 0 ? page - 1 : 0; // page is always should be page-1 in backend to calculate skipping

  // Skip
  // LIMIT 10, 20
  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  /* FILTERING & SEARCHING & SORTING & PAGINATION */

  res.getModelList = async function (Model, populate = null) {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  // Details:
  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
