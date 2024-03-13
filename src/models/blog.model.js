"use strict";

const mongoose = require("mongoose");

// BLOG CATEGORY
const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "blogCategory",
    timestamps: true,
  }
);

// BLOG POST
const blogPostSchema = new mongoose.Schema(
  {
    //     _id - auto created,
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
      ref: "BlogCategory", // model name
    },
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
    // createdAt - default when timestamps is true
    // updatedAt - default when timestamps is true
  },
  {
    collection: "blogPost",
    timestamps: true,
  }
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema), // model name is the string inside the bracets
  BlogPost: mongoose.model("BlogPost", blogPostSchema),
};
