"use strict";

// Controller

// require("express-async-errors");
const { BlogCategory, BlogPost } = require("../models/blog.model");

module.exports.BlogCategory = {
  list: async (req, res) => {
    // const data = await BlogCategory.find();
    const data = await res.getModelList(BlogCategory);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogCategory),
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
    const data = await res.getModelList(BlogPost);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(BlogPost),
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
