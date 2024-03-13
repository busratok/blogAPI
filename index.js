"use strict";
/**--------BLOG API with Mongoose  */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.all("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log(`Running on: http://${HOST}:${PORT}`));
