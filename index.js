"use strict";
/**--------BLOG API with Mongoose  */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json()); // keep it at the top

app.all("/", (req, res) => {
  res.send("Hello");
});

app.use("./src/errorHandler"); // keep it at the bottom

app.listen(PORT, () => console.log(`Running on: http://${HOST}:${PORT}`));
