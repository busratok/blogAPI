"use strict";

const mongoose = require("mongoose");

//Password Encryption
const crypto = require("node:crypto");

const keyCode = process.env.SECRET_KEY || "write_random_chars_in_here";
const loopCount = 10_000; // 10K
const charCount = 32; // assign 32 for 64
const encType = "sha512";

const passwordEncrypt = function (password) {
  return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType);
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      // validate: (email) => {return true},
      validate: [
        (email) => email.includes("@") && email.includes("."),
        "Email type is incorrect",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      // set: (password) => passwordEncrypt(password),
      set: passwordEncrypt,
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "user",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
