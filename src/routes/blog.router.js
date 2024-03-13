"use strict";

const router = require("express").Router();

const { BlogPost } = require("../controllers/blog.controller");

router.route("/post").get(BlogPost.list).post(BlogPost.create);

router
  .route("/post/:postid")
  .get(BlogPost.read)
  .put(BlogPost.update)
  .delete(BlogPost.delete);

module.exports = router;
