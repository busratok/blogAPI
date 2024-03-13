"use strict";

const router = require("express").Router();

const { BlogCategory, BlogPost } = require("../controllers/blog.controller");

// Blog Category
router.route("/categories").get(BlogCategory.list).post(BlogCategory.create);
router
  .route("/categories/:categoryId")
  .get(BlogCategory.read)
  .put(BlogCategory.update)
  .delete(BlogCategory.delete);

// Blog Post
router.route("/post").get(BlogPost.list).post(BlogPost.create);
router
  .route("/post/:postid")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);

module.exports = router;
