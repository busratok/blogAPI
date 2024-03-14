"use strict";

const mongoose = require("mongoose");

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
