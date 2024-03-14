"use stict";

const User = require("../models/user.model");

const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  list: async (req, res) => {
    const data = await User.find();
    res.status(200).send({
      error: false,
      data,
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await User.update({ _id: req.params.userId }, req.body);
    const updatedData = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      updatedData,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email: email });
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        /* Session */
        // req.session = {
        //   email: user.email,
        //   password: user.password,
        // };
        req.session.email = user.email;
        req.session.password = user.password;
        /* Session */

        /* Cookies */
        if (req.body.remindMe) {
          req.session.remindMe = req.body.remindMe;
          // Set maxAge
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }
        /* Cookies */

        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Email or password is not valid");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },
};
