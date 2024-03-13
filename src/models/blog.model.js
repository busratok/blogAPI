"use strict";

const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    //     _id - auto created,
    // categoryId:
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    // createdAt - default
    // updatedAt - default
  },
  {
    collection: "blogPost",
    // timestamps: true
  }
);

module.exports = {
  BlogPost: mongoose.model("Blog Post", blogPostSchema),
};
