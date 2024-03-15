"use strict";

// Controller

require("express-async-errors");
const { BlogCategory, BlogPost } = require("../models/blog.model");

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {
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

    console.log(page);

    /* FILTERING & SEARCHING & SORTING & PAGINATION */

    // const data = await BlogPost.find(filter);
    const data = await BlogPost.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.find({ _id: req.params.postid });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postid }, req.body);
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postid });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
