"use strict";
/**--------BLOG API with Mongoose  */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// DB
require("./src/configs/dbConnection");

app.use(express.json()); // keep it at the top

app.all("/", (req, res) => {
  res.send("Hello");
});

require("express-async-errors");
app.use("/user", require("./src/routes/user.router"));
app.use("/blog", require("./src/routes/blog.router"));

app.use(require("./src/middlewares/errorHandler")); // keep it at the bottom

app.listen(PORT, () => console.log(`Running on: http://${HOST}:${PORT}`));

// require("./src/sync")();
