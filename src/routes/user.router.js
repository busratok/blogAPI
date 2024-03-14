"use strict";

const router = require("express").Router();
const User = require("../controllers/user.controller");

router.route("/").get(User.list).post(User.create);
router.route("/:userId").get(User.read).put(User.update).delete(User.delete);
// Login - Logout
router.post("/login", User.login);

module.exports = router;
