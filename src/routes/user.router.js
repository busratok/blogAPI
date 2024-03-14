"use strict";

const router = require("express").Router();
const User = require("../controllers/user.controller");

// Login - Logout
router.post("/login", User.login); // put it above /:userId
router.get("/logout", User.logout); // put it above /:userId

router.route("/").get(User.list).post(User.create);
router.route("/:userId").get(User.read).put(User.update).delete(User.delete);

module.exports = router;
