"use stict";

const { User } = require("../models/user.model");

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
};
