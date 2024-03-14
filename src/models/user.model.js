"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

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
